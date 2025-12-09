import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const reminderRouter = router({
    list: publicProcedure
        .input(z.object({ vehicleId: z.string() }))
        .query(async ({ input }) => {
            return prisma.maintenanceReminder.findMany({
                where: { vehicle_id: input.vehicleId },
                orderBy: { due_date: 'asc' },
            });
        }),

    create: publicProcedure
        .input(
            z.object({
                vehicleId: z.string(),
                reminderType: z.enum(['oil_change', 'tire_rotation', 'brake_inspection', 'general']),
                dueDate: z.string().datetime().optional(),
                dueMileage: z.number().optional(),
                notes: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.maintenanceReminder.create({
                data: {
                    vehicle_id: input.vehicleId,
                    reminder_type: input.reminderType,
                    due_date: input.dueDate,
                    due_mileage: input.dueMileage,
                    notes: input.notes,
                },
            });
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                isCompleted: z.boolean().optional(),
                notes: z.string().optional(),
            })
        )
        .mutation(async ({ input }) => {
            return prisma.maintenanceReminder.update({
                where: { id: input.id },
                data: {
                    is_completed: input.isCompleted,
                    notes: input.notes,
                },
            });
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return prisma.maintenanceReminder.delete({
                where: { id: input.id },
            });
        }),
});
