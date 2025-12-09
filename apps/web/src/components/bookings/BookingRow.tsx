import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingRowProps {
    id: string;
    customerName: string;
    service: string;
    date: string;
    time: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    amount: string;
}

const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Confirmed: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
};

export function BookingRow({
    customerName,
    service,
    date,
    time,
    status,
    amount,
}: BookingRowProps) {
    return (
        <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {customerName}
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">{service}</td>
            <td className="px-3 py-4 text-sm text-gray-500">
                {date} <span className="text-gray-400">•</span> {time}
            </td>
            <td className="px-3 py-4 text-sm">
                <span
                    className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        statusStyles[status]
                    )}
                >
                    {status}
                </span>
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">{amount}</td>
            <td className="relative py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-6">
                <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </td>
        </tr>
    );
}
