import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { TRPCError } from '@trpc/server';

export const emergencyRouter = router({
    create: publicProcedure
        .input(
            z.object({
                driverId: z.string(),
                lat: z.number(),
                lng: z.number(),
                description: z.string().optional(),
                type: z.string(), // e.g., 'tow', 'lockout', 'jumpstart'
            })
        )
        .mutation(async ({ input }) => {
            // Find nearby mechanics (simplified for MVP)
            // Ideally, we would use PostGIS or a geospatial query
            // For now, we just create the request and let mechanics poll or be notified via socket

            const request = await prisma.emergencyRequest.create({
                data: {
                    driver_id: input.driverId,
                    location_lat: input.lat,
                    location_lng: input.lng,
                    issue_description: input.description ? `${input.type}: ${input.description}` : input.type,
                    status: 'pending',
                },
            });

            return request;
        }),

    listNearby: publicProcedure
        .input(
            z.object({
                lat: z.number(),
                lng: z.number(),
                radiusKm: z.number().default(50),
            })
        )
        .query(async ({ input }) => {
            // Fetch pending requests
            const requests = await prisma.emergencyRequest.findMany({
                where: { status: 'pending' },
                include: {
                    driver: {
                        include: {
                            user: {
                                select: { full_name: true, phone_number: true },
                            },
                            vehicles: true,
                        },
                    },
                },
            });

            // Filter by distance
            return requests.filter((req) => {
                const dist = getDistanceFromLatLonInKm(input.lat, input.lng, req.location_lat, req.location_lng);
                return dist <= input.radiusKm;
            });
        }),

    accept: publicProcedure
        .input(
            z.object({
                requestId: z.string(),
                mechanicId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const request = await prisma.emergencyRequest.findUnique({ where: { id: input.requestId } });
            if (!request) throw new TRPCError({ code: 'NOT_FOUND', message: 'Request not found' });
            if (request.status !== 'pending') throw new TRPCError({ code: 'CONFLICT', message: 'Request already accepted' });

            return prisma.emergencyRequest.update({
                where: { id: input.requestId },
                data: {
                    status: 'accepted',
                    assigned_mechanic_id: input.mechanicId,
                },
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
