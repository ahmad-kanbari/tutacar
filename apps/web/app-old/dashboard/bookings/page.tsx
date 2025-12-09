import { BookingRow } from '@/components/bookings/BookingRow';

// Mock Data
const BOOKINGS = [
    {
        id: '1',
        customerName: 'Alice Smith',
        service: 'Oil Change',
        date: 'Dec 12, 2023',
        time: '10:00 AM',
        status: 'Confirmed' as const,
        amount: '$45.00',
    },
    {
        id: '2',
        customerName: 'Bob Jones',
        service: 'Brake Pad Replacement',
        date: 'Dec 12, 2023',
        time: '02:00 PM',
        status: 'Pending' as const,
        amount: '$120.00',
    },
    {
        id: '3',
        customerName: 'Charlie Brown',
        service: 'Tire Rotation',
        date: 'Dec 11, 2023',
        time: '11:30 AM',
        status: 'Completed' as const,
        amount: '$30.00',
    },
    {
        id: '4',
        customerName: 'David Wilson',
        service: 'Diagnostic',
        date: 'Dec 10, 2023',
        time: '09:00 AM',
        status: 'Cancelled' as const,
        amount: '$80.00',
    },
];

export default function BookingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                <div className="flex space-x-3">
                    <select className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                    <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        New Booking
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Customer
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Service
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date & Time
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Amount
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-6">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {BOOKINGS.map((booking) => (
                            <BookingRow key={booking.id} {...booking} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
