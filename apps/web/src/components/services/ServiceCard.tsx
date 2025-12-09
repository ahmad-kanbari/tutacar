import React from 'react';
import { Clock, DollarSign, Edit2, Trash2 } from 'lucide-react';

interface ServiceCardProps {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export function ServiceCard({
    id,
    name,
    description,
    price,
    duration,
    onEdit,
    onDelete,
}: ServiceCardProps) {
    return (
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(id)}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <p className="mt-2 flex-1 text-sm text-gray-500">{description}</p>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
                    {duration}
                </div>
                <div className="flex items-center text-lg font-bold text-gray-900">
                    <DollarSign className="mr-0.5 h-4 w-4 text-gray-400" />
                    {price}
                </div>
            </div>
        </div>
    );
}
