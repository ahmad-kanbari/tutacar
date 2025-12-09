import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export const paymentRouter = router({
    createIntent: publicProcedure
        .input(
            z.object({
                bookingId: z.string(),
                amount: z.number(),
                currency: z.string().default('usd'),
            })
        )
        .mutation(async ({ input }) => {
            // Calculate commission (15%)
            const commissionRate = 0.15;
            const commissionAmount = input.amount * commissionRate;
            const mechanicAmount = input.amount - commissionAmount;

            // Create Stripe PaymentIntent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(input.amount * 100), // Stripe expects cents
                currency: input.currency,
                metadata: {
                    bookingId: input.bookingId,
                    commission: commissionAmount.toFixed(2),
                    mechanicPayout: mechanicAmount.toFixed(2),
                },
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            // Create payment record
            const payment = await prisma.payment.create({
                data: {
                    booking_id: input.bookingId,
                    stripe_payment_intent_id: paymentIntent.id,
                    amount: input.amount,
                    commission_amount: commissionAmount,
                    mechanic_amount: mechanicAmount,
                    currency: input.currency,
                    status: 'pending',
                },
            });

            return {
                clientSecret: paymentIntent.client_secret,
                paymentId: payment.id,
            };
        }),

    confirm: publicProcedure
        .input(z.object({ paymentId: z.string() }))
        .mutation(async ({ input }) => {
            // In a real app, this should be handled via Stripe Webhook to be secure
            // For MVP/Demo, we allow client confirmation after successful payment

            const payment = await prisma.payment.update({
                where: { id: input.paymentId },
                data: {
                    status: 'paid',
                    paid_at: new Date(),
                },
                include: { booking: true },
            });

            // Update booking status
            if (payment.booking) {
                await prisma.booking.update({
                    where: { id: payment.booking.id },
                    data: {
                        payment_status: 'paid',
                        status: 'completed' // Auto-complete for simplicity, or move to 'in_progress'
                    },
                });
            }

            return payment;
        }),

    history: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            // Find payments linked to bookings where the user is either driver or mechanic
            return prisma.payment.findMany({
                where: {
                    booking: {
                        OR: [
                            { driver: { user_id: input.userId } },
                            { mechanic: { user_id: input.userId } },
                        ],
                    },
                },
                include: { booking: true },
                orderBy: { created_at: 'desc' },
            });
        }),
});
