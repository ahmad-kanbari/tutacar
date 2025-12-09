'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type MechanicRole = 'admin' | 'staff';

interface RoleContextType {
    role: MechanicRole;
    setRole: (role: MechanicRole) => void;
    hasPermission: (permission: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<MechanicRole>('admin');

    const hasPermission = (permission: string) => {
        if (role === 'admin') return true;

        // Staff permissions
        const staffPermissions = [
            'view_bookings',
            'edit_bookings',
            'view_services',
            'view_profile',
        ];

        return staffPermissions.includes(permission);
    };

    return (
        <RoleContext.Provider value={{ role, setRole, hasPermission }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}
