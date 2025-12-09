'use client';

import React, { useState } from 'react';
import { Plus, MoreVertical, Shield, User, Mail, Trash2, Edit2 } from 'lucide-react';
import { AddTeamMemberModal } from '@/components/team/AddTeamMemberModal';
import { MechanicRole, useRole } from '@/contexts/RoleContext';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: MechanicRole;
    status: 'active' | 'invited';
    joinedAt: string;
}

export default function TeamPage() {
    const { hasPermission } = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>([
        {
            id: '1',
            name: 'John Mechanic',
            email: 'john@example.com',
            role: 'admin',
            status: 'active',
            joinedAt: 'Dec 1, 2023',
        },
        {
            id: '2',
            name: 'Sarah Staff',
            email: 'sarah@example.com',
            role: 'staff',
            status: 'active',
            joinedAt: 'Dec 5, 2023',
        },
    ]);

    // Redirect if no permission (in a real app, use middleware or layout protection)
    if (!hasPermission('view_settings')) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center text-center">
                <Shield className="mb-4 h-12 w-12 text-gray-300" />
                <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
                <p className="mt-2 text-gray-500">You do not have permission to view this page.</p>
            </div>
        );
    }

    const handleAddMember = (email: string, role: MechanicRole, name: string) => {
        const newMember: TeamMember = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role,
            status: 'invited',
            joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setMembers([...members, newMember]);
    };

    const handleRemoveMember = (id: string) => {
        if (confirm('Are you sure you want to remove this team member?')) {
            setMembers(members.filter((m) => m.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your shop's team members and their access roles.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Member
                </button>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Joined</th>
                                <th className="px-6 py-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {members.map((member) => (
                                <tr key={member.id} className="group hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{member.name}</div>
                                                <div className="text-gray-500">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${member.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}
                                        >
                                            {member.role === 'admin' ? (
                                                <Shield className="mr-1 h-3 w-3" />
                                            ) : (
                                                <User className="mr-1 h-3 w-3" />
                                            )}
                                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${member.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {member.status === 'active' ? 'Active' : 'Invited'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{member.joinedAt}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddTeamMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddMember}
            />
        </div>
    );
}
