import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const loyaltyRouter = router({
    getBalance: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            let loyalty = await prisma.loyaltyPoints.findUnique({
                where: { user_id: input.userId },
            });

            if (!loyalty) {
                // Create if not exists
                loyalty = await prisma.loyaltyPoints.create({
                    data: { user_id: input.userId },
                });
            }

            return loyalty;
        }),

    getHistory: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            const loyalty = await prisma.loyaltyPoints.findUnique({
                where: { user_id: input.userId },
            });

            if (!loyalty) return [];

            return prisma.pointTransaction.findMany({
                where: { loyalty_id: loyalty.id },
                orderBy: { created_at: 'desc' },
            });
        }),

    getReferralCode: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            // Check if user has made any referrals (as referrer) to find their code,
            // or check if we store it on User model. Schema has Referral model with referral_code.
            // Actually, typically a user HAS a referral code to share.
            // The schema `Referral` model seems to track *made* referrals.
            // Let's assume we generate a code on the fly or store it.
            // For MVP, let's generate a stable code based on user ID or name if not stored.
            // Wait, the schema `Referral` has `referral_code` but that's for a specific referral instance?
            // "referral_code String @unique" in Referral model suggests it might be a unique code for that specific invite?
            // Or maybe it's the referrer's code?
            // Let's look at schema:
            // model Referral { referrer_id, referee_email, referral_code @unique ... }
            // This looks like a unique code PER REFERRAL INVITE.
            // But usually users have a static code like "AHMAD123".
            // Let's implement a simple "create referral" logic where we generate a code.

            return { code: `REF-${input.userId.substring(0, 8).toUpperCase()}` };
        }),

    redeemPoints: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                points: z.number().min(1),
                rewardType: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const loyalty = await prisma.loyaltyPoints.findUnique({
                where: { user_id: input.userId },
            });

            if (!loyalty || loyalty.total_points < input.points) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Insufficient points' });
            }

            // Deduct points
            await prisma.loyaltyPoints.update({
                where: { id: loyalty.id },
                data: { total_points: { decrement: input.points } },
            });

            // Record transaction
            await prisma.pointTransaction.create({
                data: {
                    loyalty_id: loyalty.id,
                    points: -input.points,
                    action_type: 'redeemed',
                    description: `Redeemed for ${input.rewardType}`,
                },
            });

            return { success: true, remainingPoints: loyalty.total_points - input.points };
        }),
});
