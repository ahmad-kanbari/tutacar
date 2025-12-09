import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
    return (
        <div className={cn("rounded-xl bg-white p-6 shadow-sm border border-gray-100", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className="rounded-full bg-blue-50 p-3">
                    <Icon className="h-6 w-6 text-blue-500" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span
                        className={cn(
                            "font-medium",
                            trend.value >= 0 ? "text-green-600" : "text-red-600"
                        )}
                    >
                        {trend.value > 0 ? "+" : ""}
                        {trend.value}%
                    </span>
                    <span className="ml-2 text-gray-500">{trend.label}</span>
                </div>
            )}
        </div>
    );
}
