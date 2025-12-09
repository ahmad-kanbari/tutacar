import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const adminRouter = router({
    listUsers: publicProcedure
        .input(
            z.object({
                role: z.enum(['driver', 'mechanic', 'admin']).optional(),
                page: z.number().default(1),
                limit: z.number().default(10),
                search: z.string().optional(),
            })
        )
        .query(async ({ input }) => {
            const skip = (input.page - 1) * input.limit;
            const where: any = {};

            if (input.role) {
                where.role = input.role;
            }

            if (input.search) {
                where.OR = [
                    { full_name: { contains: input.search, mode: 'insensitive' } },
                    { email: { contains: input.search, mode: 'insensitive' } },
                ];
            }

            const [users, total] = await Promise.all([
                prisma.user.findMany({
                    where,
                    skip,
                    take: input.limit,
                    orderBy: { created_at: 'desc' },
                    include: {
                        driver: true,
                        mechanic: true,
                    },
                }),
                prisma.user.count({ where }),
            ]);

            return {
                users,
                total,
                pages: Math.ceil(total / input.limit),
            };
        }),

    verifyMechanic: publicProcedure
        .input(
            z.object({
                mechanicId: z.string(),
                status: z.enum(['verified', 'rejected']),
            })
        )
        .mutation(async ({ input }) => {
            const mechanic = await prisma.mechanic.findUnique({ where: { id: input.mechanicId } });
            if (!mechanic) throw new TRPCError({ code: 'NOT_FOUND', message: 'Mechanic not found' });

            return prisma.mechanic.update({
                where: { id: input.mechanicId },
                data: {
                    verification_status: input.status,
                    is_available: input.status === 'verified', // Auto-enable if verified
                },
            });
        }),

    getStats: publicProcedure.query(async () => {
        const [totalUsers, totalDrivers, totalMechanics, totalBookings, revenue] = await Promise.all([
            prisma.user.count(),
            prisma.driver.count(),
            prisma.mechanic.count(),
            prisma.booking.count(),
            prisma.payment.aggregate({
                where: { status: 'paid' },
                _sum: { amount: true },
            }),
        ]);

        return {
            totalUsers,
            totalDrivers,
            totalMechanics,
            totalBookings,
            totalRevenue: revenue._sum.amount || 0,
        };
    }),

    // Simple ban mechanism (toggle is_verified to false for now, or add banned field later)
    // For now, let's assume is_verified=false means they can't operate
    toggleVerification: publicProcedure
        .input(z.object({ userId: z.string(), isVerified: z.boolean() }))
        .mutation(async ({ input }) => {
            return prisma.user.update({
                where: { id: input.userId },
                data: { is_verified: input.isVerified },
            });
        }),

    getFinancialReport: publicProcedure
        .input(
            z.object({
                startDate: z.string().datetime().optional(),
                endDate: z.string().datetime().optional(),
            })
        )
        .query(async ({ input }) => {
            const where: any = { status: 'paid' };
            if (input.startDate || input.endDate) {
                where.created_at = {};
                if (input.startDate) where.created_at.gte = input.startDate;
                if (input.endDate) where.created_at.lte = input.endDate;
            }

            const payments = await prisma.payment.findMany({
                where,
                include: { booking: true },
            });

            const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);
            const platformCommission = payments.reduce((sum, p) => sum + Number(p.commission_amount), 0);
            const mechanicPayouts = payments.reduce((sum, p) => sum + Number(p.mechanic_amount), 0);

            return {
                totalRevenue,
                platformCommission,
                mechanicPayouts,
                transactionCount: payments.length,
            };
        }),

    listApplications: publicProcedure
        .input(
            z.object({
                status: z.enum(['pending', 'rejected']).default('pending'),
                page: z.number().default(1),
                limit: z.number().default(10),
            })
        )
        .query(async ({ input }) => {
            const skip = (input.page - 1) * input.limit;
            const [mechanics, total] = await Promise.all([
                prisma.mechanic.findMany({
                    where: { verification_status: input.status },
                    skip,
                    take: input.limit,
                    include: {
                        user: {
                            select: { full_name: true, email: true, phone_number: true },
                        },
                    },
                }),
                prisma.mechanic.count({ where: { verification_status: input.status } }),
            ]);

            return {
                applications: mechanics,
                total,
                pages: Math.ceil(total / input.limit),
            };
        }),

    listArticles: publicProcedure
        .input(
            z.object({
                page: z.number().default(1),
                limit: z.number().default(10),
            })
        )
        .query(async ({ input }) => {
            const skip = (input.page - 1) * input.limit;
            const [articles, total] = await Promise.all([
                prisma.article.findMany({
                    skip,
                    take: input.limit,
                    orderBy: { created_at: 'desc' },
                }),
                prisma.article.count(),
            ]);

            return {
                articles,
                total,
                pages: Math.ceil(total / input.limit),
            };
        }),

    manageContent: publicProcedure
        .input(
            z.object({
                action: z.enum(['create', 'update', 'delete']),
                id: z.string().optional(),
                data: z.object({
                    title: z.string(),
                    content: z.string(),
                    category: z.string(),
                    slug: z.string(),
                    readTimeMinutes: z.number(),
                }).optional(),
            })
        )
        .mutation(async ({ input }) => {
            if (input.action === 'create' && input.data) {
                return prisma.article.create({
                    data: {
                        title: input.data.title,
                        content: input.data.content,
                        category: input.data.category,
                        slug: input.data.slug,
                        read_time_minutes: input.data.readTimeMinutes,
                        is_published: true,
                    },
                });
            } else if (input.action === 'update' && input.id && input.data) {
                return prisma.article.update({
                    where: { id: input.id },
                    data: {
                        title: input.data.title,
                        content: input.data.content,
                        category: input.data.category,
                        slug: input.data.slug,
                        read_time_minutes: input.data.readTimeMinutes,
                    },
                });
            } else if (input.action === 'delete' && input.id) {
                return prisma.article.delete({ where: { id: input.id } });
            }
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid action or missing data' });
        }),
});
