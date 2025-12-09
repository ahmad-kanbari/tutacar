import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const favoriteRouter = router({
    toggle: publicProcedure
        .input(z.object({ driverId: z.string(), mechanicId: z.string() }))
        .mutation(async ({ input }) => {
            // Check if already saved
            const existing = await prisma.savedMechanic.findUnique({
                where: {
                    driver_id_mechanic_id: {
                        driver_id: input.driverId,
                        mechanic_id: input.mechanicId,
                    },
                },
            });

            if (existing) {
                await prisma.savedMechanic.delete({
                    where: { id: existing.id },
                });
                return { saved: false };
            } else {
                await prisma.savedMechanic.create({
                    data: {
                        driver_id: input.driverId,
                        mechanic_id: input.mechanicId,
                    },
                });
                return { saved: true };
            }
        }),

    list: publicProcedure
        .input(z.object({ driverId: z.string() }))
        .query(async ({ input }) => {
            const saved = await prisma.savedMechanic.findMany({
                where: { driver_id: input.driverId },
                include: {
                    mechanic: {
                        include: {
                            user: {
                                select: { full_name: true, profile_photo_url: true },
                            },
                        },
                    },
                },
                orderBy: { created_at: 'desc' },
            });

            return saved.map((s) => s.mechanic);
        }),
});
