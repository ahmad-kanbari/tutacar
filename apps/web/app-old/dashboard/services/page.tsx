'use client';

import { useState } from 'react';
import { ServiceCard } from '@/components/services/ServiceCard';
import { AddServiceModal } from '@/components/services/AddServiceModal';
import { Plus } from 'lucide-react';

// Mock Data
const SERVICES = [
    {
        id: '1',
        name: 'Oil Change',
        description: 'Full synthetic oil change with filter replacement and multi-point inspection.',
        price: '45.00',
        duration: '30 min',
    },
    {
        id: '2',
        name: 'Brake Pad Replacement',
        description: 'Front or rear brake pad replacement with rotor resurfacing if needed.',
        price: '120.00',
        duration: '1 hr',
    },
    {
        id: '3',
        name: 'Tire Rotation',
        description: 'Rotate tires to ensure even wear and extend tire life.',
        price: '30.00',
        duration: '20 min',
    },
    {
        id: '4',
        name: 'Diagnostic',
        description: 'Comprehensive computer diagnostic to identify engine and system issues.',
        price: '80.00',
        duration: '45 min',
    },
    {
        id: '5',
        name: 'Battery Replacement',
        description: 'Remove old battery and install new one. Includes battery disposal.',
        price: '150.00',
        duration: '30 min',
    },
];

export default function ServicesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [services, setServices] = useState(SERVICES);

    const handleAdd = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        const service = services.find((s) => s.id === id);
        if (service) {
            setEditingService(service);
            setIsModalOpen(true);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter((s) => s.id !== id));
        }
    };

    const handleSave = (serviceData: any) => {
        if (serviceData.id) {
            // Edit existing
            setServices(services.map((s) => (s.id === serviceData.id ? serviceData : s)));
        } else {
            // Add new
            const newService = {
                ...serviceData,
                id: Date.now().toString(),
            };
            setServices([...services, newService]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage the services you offer to customers.
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        {...service}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <AddServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingService}
            />
        </div>
    );
}
