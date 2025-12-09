'use client';

import React from 'react';
import { useRole } from '@/contexts/RoleContext';
import { RevenueChart } from './RevenueChart';
import { StatCard } from './StatCard';
import { Calendar, DollarSign, Star, Users, TrendingUp, TrendingDown } from 'lucide-react';

export function DashboardAnalytics() {
    const { hasPermission } = useRole();

    if (!hasPermission('view_financials')) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="My Bookings"
                    value="12"
                    icon={Calendar}
                    trend={{ value: 2, label: "today" }}
                />
                <StatCard
                    title="Pending Tasks"
                    value="5"
                    icon={TrendingUp}
                    trend={{ value: 1, label: "urgent" }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Top Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value="$45,231.89"
                    icon={DollarSign}
                    trend={{ value: 20.1, label: "from last month" }}
                />
                <StatCard
                    title="Bookings"
                    value="+2350"
                    icon={Calendar}
                    trend={{ value: 180.1, label: "from last month" }}
                />
                <StatCard
                    title="Active Clients"
                    value="+12,234"
                    icon={Users}
                    trend={{ value: 19, label: "from last month" }}
                />
                <StatCard
                    title="Average Rating"
                    value="4.8"
                    icon={Star}
                    trend={{ value: 4.5, label: "from last month" }}
                />
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <RevenueChart />
                </div>
                <div className="col-span-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
                    <div className="mt-4 space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                                        CN
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Customer Name</p>
                                        <p className="text-xs text-gray-500">Oil Change • 2 hours ago</p>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">$45.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
