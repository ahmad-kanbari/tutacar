import axios from 'axios';
import { getRpcUrl } from '../config/api';

export interface Mechanic {
    id: string;
    user: {
        full_name: string;
        profile_photo_url: string | null;
    };
    specializations: string[];
    rating_average: number;
    rating_count: number;
    hourly_rate: number;
    shop_address: string;
    shop_location_lat: number | null;
    shop_location_lng: number | null;
}

export const mechanicService = {
    search: async (params?: { specialty?: string; rating?: number }) => {
        try {
            // tRPC query format for GET request
            // input needs to be URL encoded JSON
            const input = params ? JSON.stringify({ json: params }) : '{}';
            const url = `${getRpcUrl('mechanic.search')}?batch=1&input=${encodeURIComponent(
                JSON.stringify({ '0': { json: params || {} } })
            )}`;

            const response = await axios.get(url);

            // tRPC returns result in { result: { data: { json: ... } } } or similar structure depending on transformer
            // With superjson it might be different, but let's assume standard JSON for now or inspect response
            // Based on standard tRPC without superjson: { result: { data: ... } }
            // If batch=1, it returns an array: [{ result: { data: ... } }]

            if (Array.isArray(response.data) && response.data.length > 0) {
                return response.data[0].result.data.json as Mechanic[];
            }
            return [];
        } catch (error) {
            console.error('Error fetching mechanics:', error);
            throw error;
        }
    },
};
