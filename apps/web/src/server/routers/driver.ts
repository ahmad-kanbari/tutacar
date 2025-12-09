import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const driverRouter = router({
    getProfile: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            const driver = await prisma.driver.findUnique({
                where: { userId: input.userId },
                include: { user: true },
            });
            if (!driver) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Driver profile not found',
                });
            }
            return driver;
        }),

    updateProfile: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                preferred_language: z.string().optional(),
                emergency_contact_name: z.string().optional(),
                emergency_contact_phone: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { userId, ...data } = input;
            return prisma.driver.update({
                where: { userId },
                data,
            });
        }),

    updateLocation: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                lat: z.number(),
                lng: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.driver.update({
                where: { userId: input.userId },
                data: {
                    current_location_lat: input.lat,
                    current_location_lng: input.lng,
                },
            });
        }),

    getVehicles: publicProcedure
        .input(z.object({ driverId: z.string() }))
        .query(async ({ input }) => {
            return prisma.vehicle.findMany({
                where: { driver_id: input.driverId },
            });
        }),

    addVehicle: publicProcedure
        .input(
            z.object({
                driverId: z.string(),
                make: z.string(),
                model: z.string(),
                year: z.number(),
                color: z.string().optional(),
                license_plate: z.string().optional(),
                current_mileage: z.number().optional(),
                vin_number: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { driverId, ...data } = input;
            return prisma.vehicle.create({
                data: {
                    driver_id: driverId,
                    ...data,
                },
            });
        }),

    updateVehicle: publicProcedure
        .input(
            z.object({
                id: z.string(),
                driverId: z.string(), // For authorization check (simplified)
                make: z.string().optional(),
                model: z.string().optional(),
                year: z.number().optional(),
                color: z.string().optional(),
                license_plate: z.string().optional(),
                current_mileage: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { id, driverId, ...data } = input;
            // Verify ownership
            const vehicle = await prisma.vehicle.findUnique({ where: { id } });
            if (!vehicle || vehicle.driver_id !== driverId) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Not authorized to update this vehicle',
                });
            }
            return prisma.vehicle.update({
                where: { id },
                data,
            });
        }),

    deleteVehicle: publicProcedure
        .input(
            z.object({
                id: z.string(),
                driverId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const vehicle = await prisma.vehicle.findUnique({ where: { id: input.id } });
            if (!vehicle || vehicle.driver_id !== input.driverId) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Not authorized to delete this vehicle',
                });
            }
            return prisma.vehicle.delete({
                where: { id: input.id },
            });
        }),
});
