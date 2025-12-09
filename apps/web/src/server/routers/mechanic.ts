import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const mechanicRouter = router({
    search: publicProcedure
        .input(
            z.object({
                lat: z.number().optional(),
                lng: z.number().optional(),
                radiusKm: z.number().optional(),
                specialty: z.string().optional(),
                rating: z.number().optional(),
            })
        )
        .query(async ({ input }) => {
            // For MVP, we'll fetch all available mechanics and filter in memory if needed
            // Ideally use PostGIS or Haversine formula in SQL
            const where: any = {
                is_available: true,
                verification_status: 'verified',
            };

            if (input.specialty) {
                where.specializations = {
                    has: input.specialty,
                };
            }

            if (input.rating) {
                where.rating_average = {
                    gte: input.rating,
                };
            }

            const mechanics = await prisma.mechanic.findMany({
                where,
                include: {
                    user: {
                        select: {
                            full_name: true,
                            profile_photo_url: true,
                        },
                    },
                },
            });

            // Simple distance filtering if lat/lng provided
            if (input.lat && input.lng && input.radiusKm) {
                return mechanics.filter((m) => {
                    if (!m.shop_location_lat || !m.shop_location_lng) return false;
                    const dist = getDistanceFromLatLonInKm(
                        input.lat!,
                        input.lng!,
                        m.shop_location_lat,
                        m.shop_location_lng
                    );
                    return dist <= input.radiusKm!;
                });
            }

            return mechanics;
        }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const mechanic = await prisma.mechanic.findUnique({
                where: { id: input.id },
                include: {
                    user: {
                        select: {
                            full_name: true,
                            profile_photo_url: true,
                            phone_number: true,
                        },
                    },
                    reviews: {
                        take: 5,
                        orderBy: { created_at: 'desc' },
                        include: {
                            driver: {
                                include: {
                                    user: {
                                        select: { full_name: true, profile_photo_url: true },
                                    },
                                },
                            },
                        },
                    },
                    shop_photos: true,
                },
            });

            if (!mechanic) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Mechanic not found',
                });
            }

            return mechanic;
        }),

    updateAvailability: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                isAvailable: z.boolean(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.mechanic.update({
                where: { user_id: input.userId },
                data: { is_available: input.isAvailable },
            });
        }),

    updateProfile: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                shop_name: z.string().optional(),
                shop_address: z.string().optional(),
                shop_description: z.string().optional(),
                service_radius_km: z.number().optional(),
                hourly_rate: z.number().optional(),
                certifications: z.array(z.string()).optional(),
                specializations: z.array(z.string()).optional(),
                years_experience: z.number().optional(),
            })
        )
        .mutation(async ({ input }) => {
            const { userId, ...data } = input;
            return prisma.mechanic.update({
                where: { user_id: userId },
                data,
            });
        }),
    // --- Team Management (RBAC) ---

    addTeamMember: publicProcedure
        .input(
            z.object({
                mechanicId: z.string(),
                email: z.string().email(),
                role: z.enum(['ADMIN', 'SUB_ADMIN']),
            })
        )
        .mutation(async ({ input }) => {
            // In a real app, check if caller is ADMIN of this mechanicId

            const userToAdd = await prisma.user.findUnique({ where: { email: input.email } });

            if (!userToAdd) {
                // User doesn't exist, create an invitation
                // Check if invitation already exists
                const existingInvite = await prisma.shopInvitation.findUnique({
                    where: {
                        mechanic_id_email: {
                            mechanic_id: input.mechanicId,
                            email: input.email,
                        },
                    },
                });

                if (existingInvite) {
                    // Update existing invitation
                    return prisma.shopInvitation.update({
                        where: { id: existingInvite.id },
                        data: { role: input.role, expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // +7 days
                    });
                }

                return prisma.shopInvitation.create({
                    data: {
                        mechanic_id: input.mechanicId,
                        email: input.email,
                        role: input.role,
                        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
                    },
                });
            }

            // User exists, add directly
            return prisma.shopMember.create({
                data: {
                    mechanic_id: input.mechanicId,
                    user_id: userToAdd.id,
                    role: input.role,
                },
            });
        }),

    removeTeamMember: publicProcedure
        .input(z.object({ mechanicId: z.string(), userId: z.string() }))
        .mutation(async ({ input }) => {
            // In a real app, check if caller is ADMIN
            return prisma.shopMember.delete({
                where: {
                    mechanic_id_user_id: {
                        mechanic_id: input.mechanicId,
                        user_id: input.userId,
                    },
                },
            });
        }),

    listTeamMembers: publicProcedure
        .input(z.object({ mechanicId: z.string() }))
        .query(async ({ input }) => {
            return prisma.shopMember.findMany({
                where: { mechanic_id: input.mechanicId },
                include: {
                    user: {
                        select: { full_name: true, email: true, profile_photo_url: true },
                    },
                },
            });
        }),

    // --- Analytics (RBAC Restricted) ---

    getRevenueAnalytics: publicProcedure
        .input(
            z.object({
                mechanicId: z.string(),
                startDate: z.string().datetime(),
                endDate: z.string().datetime(),
                interval: z.enum(['day', 'month']).default('day'),
            })
        )
        .query(async ({ input }) => {
            // RBAC Check: Ensure user is ADMIN or the Owner
            // For MVP, we assume the frontend sends the correct mechanicId and we trust it, 
            // but ideally we check ctx.user.id against mechanic.user_id or shop_members table.

            const payments = await prisma.payment.findMany({
                where: {
                    booking: { mechanic_id: input.mechanicId },
                    status: 'paid',
                    created_at: {
                        gte: input.startDate,
                        lte: input.endDate,
                    },
                },
                select: {
                    created_at: true,
                    mechanic_amount: true,
                },
                orderBy: { created_at: 'asc' },
            });

            // Group by interval (simple implementation)
            const groupedData: Record<string, number> = {};
            payments.forEach((p) => {
                const date = new Date(p.created_at);
                const key = input.interval === 'day'
                    ? date.toISOString().split('T')[0]
                    : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

                groupedData[key] = (groupedData[key] || 0) + Number(p.mechanic_amount);
            });

            return Object.entries(groupedData).map(([date, amount]) => ({ date, amount }));
        }),

    getBookingStats: publicProcedure
        .input(z.object({ mechanicId: z.string() }))
        .query(async ({ input }) => {
            const stats = await prisma.booking.groupBy({
                by: ['status'],
                where: { mechanic_id: input.mechanicId },
                _count: { _all: true },
            });

            return stats.map((s) => ({ status: s.status, count: s._count._all }));
        }),

    getDashboardStats: publicProcedure
        .input(z.object({ mechanicId: z.string() }))
        .query(async ({ input }) => {
            const [bookings, reviews, revenue] = await Promise.all([
                prisma.booking.count({ where: { mechanic_id: input.mechanicId } }),
                prisma.review.count({ where: { mechanic_id: input.mechanicId } }),
                prisma.payment.aggregate({
                    where: {
                        booking: { mechanic_id: input.mechanicId },
                        status: 'paid',
                    },
                    _sum: { mechanic_amount: true },
                }),
            ]);

            const mechanic = await prisma.mechanic.findUnique({
                where: { id: input.mechanicId },
                select: { rating_average: true, total_reviews: true },
            });

            return {
                totalBookings: bookings,
                totalReviews: reviews,
                totalRevenue: revenue._sum.mechanic_amount || 0,
                rating: mechanic?.rating_average || 0,
            };
        }),

    // Services Management
    listServices: publicProcedure
        .input(z.object({ mechanicId: z.string() }))
        .query(async ({ input }) => {
            return prisma.mechanicService.findMany({
                where: { mechanic_id: input.mechanicId, is_active: true },
            });
        }),

    createService: publicProcedure
        .input(
            z.object({
                mechanicId: z.string(),
                name: z.string(),
                description: z.string().optional(),
                price: z.number(),
                durationMin: z.number(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.mechanicService.create({
                data: {
                    mechanic_id: input.mechanicId,
                    name: input.name,
                    description: input.description,
                    price: input.price,
                    duration_min: input.durationMin,
                },
            });
        }),

    updateService: publicProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().optional(),
                description: z.string().optional(),
                price: z.number().optional(),
                durationMin: z.number().optional(),
                isActive: z.boolean().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.mechanicService.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                    description: input.description,
                    price: input.price,
                    duration_min: input.durationMin,
                    is_active: input.isActive,
                },
            });
        }),

    deleteService: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.mechanicService.update({
                where: { id: input.id },
                data: { is_active: false }, // Soft delete
            });
        }),

    // Working Hours
    updateWorkingHours: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                workingHours: z.any(), // JSON object
            })
        )
        .mutation(async ({ input }) => {
            return prisma.mechanic.update({
                where: { user_id: input.userId },
                data: { working_hours: input.workingHours },
            });
        }),

    // Photos
    addPhoto: publicProcedure
        .input(
            z.object({
                mechanicId: z.string(),
                photoUrl: z.string(),
                caption: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.shopPhoto.create({
                data: {
                    mechanic_id: input.mechanicId,
                    photo_url: input.photoUrl,
                    caption: input.caption,
                },
            });
        }),

    deletePhoto: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.shopPhoto.delete({
                where: { id: input.id },
            });
        }),
});

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}
