'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Check, X, Search } from 'lucide-react';

export default function MechanicVerification() {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'pending' | 'rejected'>('pending');

    const { data, isLoading, refetch } = trpc.admin.listApplications.useQuery({
        page,
        limit: 10,
        status: statusFilter,
    });

    const verifyMutation = trpc.admin.verifyMechanic.useMutation({
        onSuccess: () => {
            refetch();
        },
    });

    const handleVerify = (mechanicId: string, status: 'verified' | 'rejected') => {
        if (confirm(`Are you sure you want to ${status} this mechanic?`)) {
            verifyMutation.mutate({ mechanicId, status });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mechanic Verification</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setStatusFilter('pending')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${statusFilter === 'pending'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
                            }`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setStatusFilter('rejected')}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${statusFilter === 'rejected'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
                            }`}
                    >
                        Rejected
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading applications...</div>
            ) : (
                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                            {data?.applications.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                data?.applications.map((mechanic) => (
                                    <tr key={mechanic.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {mechanic.user.full_name}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {mechanic.user.email}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {mechanic.user.phone_number}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${mechanic.verification_status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {mechanic.verification_status}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            {mechanic.verification_status === 'pending' && (
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleVerify(mechanic.id, 'verified')}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Approve"
                                                    >
                                                        <Check className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleVerify(mechanic.id, 'rejected')}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Reject"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination controls could go here */}
                </div>
            )}
        </div>
    );
}
