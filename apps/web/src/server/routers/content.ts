import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const contentRouter = router({
    listArticles: publicProcedure
        .input(
            z.object({
                category: z.string().optional(),
            })
        )
        .query(async ({ input }) => {
            const where: any = { is_published: true };
            if (input.category) {
                where.category = input.category;
            }
            return prisma.article.findMany({
                where,
                orderBy: { created_at: 'desc' },
            });
        }),

    getArticleBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const article = await prisma.article.findUnique({
                where: { slug: input.slug },
            });
            if (!article) throw new TRPCError({ code: 'NOT_FOUND', message: 'Article not found' });
            return article;
        }),

    bookmark: publicProcedure
        .input(z.object({ userId: z.string(), articleId: z.string() }))
        .mutation(async ({ input }) => {
            // Toggle bookmark
            const existing = await prisma.articleBookmark.findUnique({
                where: {
                    user_id_article_id: {
                        user_id: input.userId,
                        article_id: input.articleId,
                    },
                },
            });

            if (existing) {
                await prisma.articleBookmark.delete({
                    where: { id: existing.id },
                });
                return { bookmarked: false };
            } else {
                await prisma.articleBookmark.create({
                    data: {
                        user_id: input.userId,
                        article_id: input.articleId,
                    },
                });
                return { bookmarked: true };
            }
        }),
});
