'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';

export default function CalendarPage() {
    // Mock days for a calendar grid (simplified)
    const days = Array.from({ length: 35 }, (_, i) => i + 1);
    const bookings = [
        { id: 1, day: 5, title: 'Oil Change', time: '10:00 AM', client: 'John Doe' },
        { id: 2, day: 12, title: 'Brake Check', time: '02:00 PM', client: 'Alice Smith' },
        { id: 3, day: 15, title: 'Tire Rotation', time: '09:00 AM', client: 'Bob Jones' },
        { id: 4, day: 25, title: 'General Service', time: '11:00 AM', client: 'Sarah Wilson' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
                        <button className="rounded p-1 hover:bg-gray-100">
                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                        </button>
                        <span className="px-4 font-medium text-gray-900">December 2023</span>
                        <button className="rounded p-1 hover:bg-gray-100">
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        Add Booking
                    </button>
                </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="py-3 text-center text-sm font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
                    {days.map((day) => {
                        const dayBookings = bookings.filter((b) => b.day === day);
                        const isToday = day === 12; // Mock today

                        return (
                            <div key={day} className={`min-h-[120px] p-2 ${day > 31 ? 'bg-gray-50/50' : ''}`}>
                                <div className="mb-2 flex justify-between">
                                    <span
                                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'
                                            }`}
                                    >
                                        {day <= 31 ? day : day - 31}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {dayBookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="cursor-pointer rounded border border-blue-100 bg-blue-50 p-1.5 text-xs hover:border-blue-200 hover:bg-blue-100"
                                        >
                                            <div className="font-medium text-blue-900">{booking.title}</div>
                                            <div className="mt-0.5 flex items-center text-blue-700">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {booking.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
