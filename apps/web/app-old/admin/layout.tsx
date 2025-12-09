import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Admin Panel</h2>
                    <div className="flex items-center space-x-4">
                        {/* Add user profile dropdown or notifications here */}
                        <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
