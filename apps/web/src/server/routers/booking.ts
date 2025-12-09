import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const bookingRouter = router({
    create: publicProcedure
        .input(
            z.object({
                driverId: z.string(),
                mechanicId: z.string(),
                vehicleId: z.string(),
                serviceType: z.string(),
                description: z.string().optional(),
                issuePhotos: z.array(z.string()).optional(),
                scheduledTime: z.string().datetime().optional(), // ISO string
                locationLat: z.number().optional(),
                locationLng: z.number().optional(),
                locationAddress: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            // Verify driver and mechanic exist
            const driver = await prisma.driver.findUnique({ where: { id: input.driverId } });
            const mechanic = await prisma.mechanic.findUnique({ where: { id: input.mechanicId } });

            if (!driver || !mechanic) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Driver or Mechanic not found',
                });
            }

            return prisma.booking.create({
                data: {
                    driver_id: input.driverId,
                    mechanic_id: input.mechanicId,
                    vehicle_id: input.vehicleId,
                    service_type: input.serviceType,
                    description: input.description,
                    issue_photos: input.issuePhotos || [],
                    scheduled_time: input.scheduledTime,
                    location_lat: input.locationLat,
                    location_lng: input.locationLng,
                    location_address: input.locationAddress,
                    status: 'requested',
                },
            });
        }),

    list: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                role: z.enum(['driver', 'mechanic']),
                status: z.enum(['requested', 'accepted', 'in_progress', 'completed', 'cancelled']).optional(),
            })
        )
        .query(async ({ input }) => {
            const where: any = {};
            if (input.role === 'driver') {
                // Need to find driverId from userId
                const driver = await prisma.driver.findUnique({ where: { user_id: input.userId } });
                if (!driver) throw new TRPCError({ code: 'NOT_FOUND', message: 'Driver profile not found' });
                where.driver_id = driver.id;
            } else {
                const mechanic = await prisma.mechanic.findUnique({ where: { user_id: input.userId } });
                if (!mechanic) throw new TRPCError({ code: 'NOT_FOUND', message: 'Mechanic profile not found' });
                where.mechanic_id = mechanic.id;
            }

            if (input.status) {
                where.status = input.status;
            }

            return prisma.booking.findMany({
                where,
                include: {
                    driver: { include: { user: { select: { full_name: true, profile_photo_url: true } } } },
                    mechanic: { include: { user: { select: { full_name: true, profile_photo_url: true } } } },
                    vehicle: true,
                },
                orderBy: { created_at: 'desc' },
            });
        }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const booking = await prisma.booking.findUnique({
                where: { id: input.id },
                include: {
                    driver: { include: { user: true } },
                    mechanic: { include: { user: true } },
                    vehicle: true,
                    reviews: true,
                    payments: true,
                },
            });

            if (!booking) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' });
            }
            return booking;
        }),

    updateStatus: publicProcedure
        .input(
            z.object({
                id: z.string(),
                status: z.enum(['accepted', 'in_progress', 'completed', 'cancelled']),
                userId: z.string(), // Mechanic ID (user_id)
            })
        )
        .mutation(async ({ input }) => {
            const booking = await prisma.booking.findUnique({ where: { id: input.id } });
            if (!booking) throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' });

            // Verify mechanic ownership
            const mechanic = await prisma.mechanic.findUnique({ where: { user_id: input.userId } });
            if (!mechanic || mechanic.id !== booking.mechanic_id) {
                // Allow driver to cancel only if status is requested
                if (input.status === 'cancelled') {
                    const driver = await prisma.driver.findUnique({ where: { user_id: input.userId } });
                    if (driver && driver.id === booking.driver_id) {
                        // Driver cancelling
                        return prisma.booking.update({
                            where: { id: input.id },
                            data: { status: 'cancelled' },
                        });
                    }
                }

                throw new TRPCError({ code: 'FORBIDDEN', message: 'Not authorized' });
            }

            const data: any = { status: input.status };
            if (input.status === 'accepted') data.accepted_at = new Date();
            if (input.status === 'in_progress') data.started_at = new Date();
            if (input.status === 'completed') data.completed_at = new Date();

            return prisma.booking.update({
                where: { id: input.id },
                data,
            });
        }),
});
