'use client';

import { RoleProvider, useRole } from '@/contexts/RoleContext';
import { DashboardAnalytics } from '@/components/dashboard/DashboardAnalytics';
import { MechanicRole } from '@/contexts/RoleContext';

function DashboardContent() {
    const { role, setRole } = useRole();

    return (
        <div className="space-y-6">
            {/* Role Switcher for Demo */}
            <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-4">
                <div>
                    <h2 className="text-lg font-semibold text-blue-900">Dashboard View Mode</h2>
                    <p className="text-sm text-blue-700">
                        Current View: <span className="font-bold uppercase">{role}</span>
                    </p>
                </div>
                <div className="flex space-x-2">
                    {(['admin', 'staff'] as MechanicRole[]).map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${role === r
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white text-blue-600 hover:bg-blue-100'
                                }`}
                        >
                            Switch to {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <DashboardAnalytics />
        </div>
    );
}

export default function DashboardPage() {
    return (
        <RoleProvider>
            <DashboardContent />
        </RoleProvider>
    );
}
