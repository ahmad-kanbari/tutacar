import React from 'react';

export function RevenueChart() {
    // Mock data for the last 6 months
    const data = [
        { month: 'Jul', amount: 35000, height: '60%' },
        { month: 'Aug', amount: 42000, height: '75%' },
        { month: 'Sep', amount: 38000, height: '68%' },
        { month: 'Oct', amount: 45000, height: '80%' },
        { month: 'Nov', amount: 41000, height: '72%' },
        { month: 'Dec', amount: 52000, height: '95%' },
    ];

    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
                    <p className="text-sm text-gray-500">Monthly revenue for the last 6 months</p>
                </div>
                <div className="text-2xl font-bold text-gray-900">$253,000</div>
            </div>

            <div className="flex h-64 items-end justify-between space-x-2">
                {data.map((item) => (
                    <div key={item.month} className="group relative flex h-full flex-1 flex-col justify-end">
                        <div
                            className="w-full rounded-t-md bg-blue-100 transition-all group-hover:bg-blue-200"
                            style={{ height: item.height }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                ${item.amount.toLocaleString()}
                            </div>
                        </div>
                        <div className="mt-2 text-center text-xs font-medium text-gray-500">
                            {item.month}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
