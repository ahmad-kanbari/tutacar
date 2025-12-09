'use client';

import React, { useState } from 'react';
import { X, Mail, Shield, User } from 'lucide-react';
import { MechanicRole } from '@/contexts/RoleContext';

interface AddTeamMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (email: string, role: MechanicRole, name: string) => void;
}

export function AddTeamMemberModal({ isOpen, onClose, onAdd }: AddTeamMemberModalProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<MechanicRole>('staff');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            onAdd(email, role, name);
            setEmail('');
            setName('');
            setRole('staff');
            setIsLoading(false);
            onClose();
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Add Team Member</h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`flex items-center justify-center rounded-lg border p-3 transition-all ${role === 'admin'
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                                        : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Shield className={`mr-2 h-4 w-4 ${role === 'admin' ? 'text-blue-600' : 'text-gray-400'}`} />
                                <span className="font-medium">Admin</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('staff')}
                                className={`flex items-center justify-center rounded-lg border p-3 transition-all ${role === 'staff'
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                                        : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <User className={`mr-2 h-4 w-4 ${role === 'staff' ? 'text-blue-600' : 'text-gray-400'}`} />
                                <span className="font-medium">Staff</span>
                            </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                            {role === 'admin'
                                ? 'Full access to all features, including financial data and team management.'
                                : 'Limited access. Can view bookings and services, but cannot access settings or financials.'}
                        </p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-70"
                        >
                            {isLoading ? 'Sending Invite...' : 'Send Invitation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
