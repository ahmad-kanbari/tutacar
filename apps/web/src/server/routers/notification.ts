import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const notificationRouter = router({
    list: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            return prisma.notification.findMany({
                where: { user_id: input.userId },
                orderBy: { created_at: 'desc' },
            });
        }),

    markRead: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.notification.update({
                where: { id: input.id },
                data: { is_read: true },
            });
        }),

    markAllRead: publicProcedure
        .input(z.object({ userId: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.notification.updateMany({
                where: { user_id: input.userId, is_read: false },
                data: { is_read: true },
            });
        }),
});
