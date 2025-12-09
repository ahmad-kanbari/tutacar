'use client';

import React, { useState } from 'react';
import { Camera, MapPin, Save, User } from 'lucide-react';

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        shopName: 'AutoFix Pro Shop',
        ownerName: 'John Doe',
        email: 'john@autofix.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001',
        bio: 'Certified mechanic with over 10 years of experience specializing in Japanese and European cars.',
        specialties: 'General Repair, Diagnostics, Oil Change',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Shop Profile</h1>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column - Photo & Basic Info */}
                <div className="space-y-6 md:col-span-1">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
                        <div className="relative mx-auto mb-4 h-32 w-32">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-4xl">
                                👨‍🔧
                            </div>
                            <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-700">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">{formData.shopName}</h2>
                        <p className="text-sm text-gray-500">Verified Mechanic</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 font-medium text-gray-900">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Rating</span>
                                <span className="font-medium text-gray-900">4.8/5.0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Reviews</span>
                                <span className="font-medium text-gray-900">124</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Member Since</span>
                                <span className="font-medium text-gray-900">Jan 2023</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Edit Form */}
                <div className="md:col-span-2">
                    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Edit Details</h3>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-70"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Shop Name</label>
                                    <input
                                        type="text"
                                        value={formData.shopName}
                                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Owner Name</label>
                                    <input
                                        type="text"
                                        value={formData.ownerName}
                                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Specialties</label>
                                <input
                                    type="text"
                                    value={formData.specialties}
                                    onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="e.g. Brakes, Transmission, Oil Change"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
