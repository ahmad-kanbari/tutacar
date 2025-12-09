import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const messageRouter = router({
    list: publicProcedure
        .input(z.object({ bookingId: z.string() }))
        .query(async ({ input }) => {
            return prisma.message.findMany({
                where: { booking_id: input.bookingId },
                orderBy: { created_at: 'asc' },
            });
        }),

    send: publicProcedure
        .input(
            z.object({
                bookingId: z.string(),
                senderId: z.string(),
                receiverId: z.string(),
                messageText: z.string().optional(),
                mediaUrls: z.array(z.string()).optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.message.create({
                data: {
                    booking_id: input.bookingId,
                    sender_id: input.senderId,
                    receiver_id: input.receiverId,
                    message_text: input.messageText,
                    media_urls: input.mediaUrls || [],
                },
            });
        }),

    markRead: publicProcedure
        .input(z.object({ messageId: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.message.update({
                where: { id: input.messageId },
                data: { is_read: true },
            });
        }),
});
