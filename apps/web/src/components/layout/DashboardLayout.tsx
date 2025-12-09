import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        {/* Placeholder for user profile/notifications */}
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                        <span className="text-sm font-medium text-gray-700">John Mechanic</span>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
