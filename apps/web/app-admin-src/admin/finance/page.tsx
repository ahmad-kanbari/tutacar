'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';

export default function FinancialManagement() {
    // Simple date range state (could be enhanced with a date picker library)
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);

    const { data, isLoading } = trpc.admin.getFinancialReport.useQuery({
        startDate: startDate ? new Date(startDate).toISOString() : undefined,
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Management</h1>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="self-center text-gray-500">-</span>
                    <input
                        type="date"
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading financial data...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="rounded-md bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-300">
                                    <DollarSign className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {formatCurrency(data?.totalRevenue || 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="rounded-md bg-blue-100 p-3 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Platform Commission</p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {formatCurrency(data?.platformCommission || 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="rounded-md bg-purple-100 p-3 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Mechanic Payouts</p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {formatCurrency(data?.mechanicPayouts || 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Transaction History</h3>
                        </div>
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            {/* 
                                Ideally, we would list individual transactions here.
                                The current getFinancialReport returns aggregates.
                                We might need to update the router to return a list of payments if we want a detailed table.
                                For now, we'll just show the count.
                            */}
                            <p>Total Transactions: {data?.transactionCount}</p>
                            <p className="mt-2 text-sm">Detailed transaction list implementation pending backend update.</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
