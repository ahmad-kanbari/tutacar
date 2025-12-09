'use client';

import { trpc } from '@/lib/trpc';
import { Users, Wrench, Calendar, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    const { data: stats, isLoading } = trpc.admin.getStats.useQuery();

    if (isLoading) {
        return <div className="p-8 text-center">Loading stats...</div>;
    }

    const statCards = [
        { name: 'Total Users', value: stats?.totalUsers, icon: Users, color: 'text-blue-500' },
        { name: 'Mechanics', value: stats?.totalMechanics, icon: Wrench, color: 'text-orange-500' },
        { name: 'Bookings', value: stats?.totalBookings, icon: Calendar, color: 'text-green-500' },
        { name: 'Revenue', value: `$${stats?.totalRevenue}`, icon: DollarSign, color: 'text-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <div key={stat.name} className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className={`rounded-md p-3 bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for charts or recent activity */}
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Activity feed coming soon...</p>
            </div>
        </div>
    );
}
