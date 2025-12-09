'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Wrench, User, Settings, LogOut, Users, MessageSquare, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/contexts/RoleContext';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, permission: 'view_dashboard' },
    { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar, permission: 'view_bookings' },
    { name: 'Services', href: '/dashboard/services', icon: Wrench, permission: 'view_services' },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare, permission: 'view_bookings' },
    { name: 'Reviews', href: '/dashboard/reviews', icon: Star, permission: 'view_profile' },
    { name: 'Profile', href: '/dashboard/profile', icon: User, permission: 'view_profile' },
    { name: 'Team', href: '/dashboard/team', icon: Users, permission: 'view_settings' },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, permission: 'view_settings' },
];

export function Sidebar() {
    const pathname = usePathname();
    const { hasPermission } = useRole();

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
            <div className="flex h-16 items-center justify-center border-b border-gray-800">
                <h1 className="text-xl font-bold text-blue-500">TUTALLER</h1>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-2">
                    {navigation.map((item) => {
                        // Check permission if defined
                        if (item.permission && !hasPermission(item.permission)) {
                            return null;
                        }

                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        'mr-3 h-5 w-5 flex-shrink-0',
                                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-white'
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-gray-800 p-4">
                <button className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
                    <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
