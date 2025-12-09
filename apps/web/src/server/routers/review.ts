import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const reviewRouter = router({
    create: publicProcedure
        .input(
            z.object({
                bookingId: z.string(),
                rating: z.number().min(1).max(5),
                comment: z.string().optional(),
                photos: z.array(z.string()).optional(),
                categories: z.object({
                    quality: z.number().min(1).max(5),
                    punctuality: z.number().min(1).max(5),
                    communication: z.number().min(1).max(5),
                    pricing: z.number().min(1).max(5),
                    cleanliness: z.number().min(1).max(5).optional(),
                }).optional(),
                tags: z.array(z.string()).optional(),
            })
        )
        .mutation(async ({ input }) => {
            const booking = await prisma.booking.findUnique({ where: { id: input.bookingId } });
            if (!booking) throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' });
            if (booking.status !== 'completed') throw new TRPCError({ code: 'BAD_REQUEST', message: 'Booking must be completed to review' });

            // Check if review already exists
            const existingReview = await prisma.review.findFirst({ where: { booking_id: input.bookingId } });
            if (existingReview) throw new TRPCError({ code: 'CONFLICT', message: 'Review already exists' });

            const review = await prisma.review.create({
                data: {
                    booking_id: input.bookingId,
                    driver_id: booking.driver_id,
                    mechanic_id: booking.mechanic_id,
                    rating: input.rating,
                    comment: input.comment,
                    photos: input.photos || [],
                },
            });

            if (input.categories) {
                await prisma.reviewCategory.create({
                    data: {
                        review_id: review.id,
                        quality_rating: input.categories.quality,
                        punctuality_rating: input.categories.punctuality,
                        communication_rating: input.categories.communication,
                        pricing_rating: input.categories.pricing,
                        cleanliness_rating: input.categories.cleanliness,
                    }
                });
            }

            if (input.tags && input.tags.length > 0) {
                await prisma.reviewTag.createMany({
                    data: input.tags.map(tag => ({ review_id: review.id, tag }))
                });
            }

            // Update mechanic average rating
            const mechanicReviews = await prisma.review.findMany({ where: { mechanic_id: booking.mechanic_id } });
            const totalRating = mechanicReviews.reduce((sum, r) => sum + r.rating, 0);
            const avgRating = totalRating / mechanicReviews.length;

            await prisma.mechanic.update({
                where: { id: booking.mechanic_id },
                data: {
                    rating_average: avgRating,
                    total_reviews: mechanicReviews.length
                }
            });

            return review;
        }),

    listForMechanic: publicProcedure
        .input(z.object({ mechanicId: z.string() }))
        .query(async ({ input }) => {
            return prisma.review.findMany({
                where: { mechanic_id: input.mechanicId },
                include: {
                    driver: { include: { user: { select: { full_name: true, profile_photo_url: true } } } },
                    categories: true,
                    tags: true,
                    response: true,
                },
                orderBy: { created_at: 'desc' },
            });
        }),

    respond: publicProcedure
        .input(z.object({ reviewId: z.string(), responseText: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.reviewResponse.create({
                data: {
                    review_id: input.reviewId,
                    response_text: input.responseText
                }
            });
        }),
});
