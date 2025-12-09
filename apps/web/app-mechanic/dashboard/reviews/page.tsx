'use client';

import React from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

export default function ReviewsPage() {
    const reviews = [
        {
            id: 1,
            clientName: 'Michael Brown',
            rating: 5,
            date: '2 days ago',
            comment: 'Excellent service! They fixed my brakes quickly and the price was very reasonable. Highly recommended!',
            service: 'Brake Replacement',
            likes: 2,
        },
        {
            id: 2,
            clientName: 'Sarah Davis',
            rating: 4,
            date: '1 week ago',
            comment: 'Good work on the oil change, but the wait time was a bit longer than expected.',
            service: 'Oil Change',
            likes: 0,
        },
        {
            id: 3,
            clientName: 'James Wilson',
            rating: 5,
            date: '2 weeks ago',
            comment: 'Very professional and honest mechanics. They explained everything clearly.',
            service: 'Diagnostic',
            likes: 5,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage and respond to customer feedback.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center rounded-lg bg-yellow-50 px-3 py-1 text-yellow-700">
                        <Star className="mr-1 h-4 w-4 fill-current" />
                        <span className="font-bold">4.8</span>
                        <span className="ml-1 text-sm text-yellow-600">/ 5.0</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center">
                                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                                    {review.clientName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{review.clientName}</h3>
                                    <p className="text-xs text-gray-500">{review.date} • {review.service}</p>
                                </div>
                            </div>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="mb-4 text-gray-600">{review.comment}</p>

                        <div className="flex items-center space-x-4 border-t border-gray-100 pt-4">
                            <button className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Reply
                            </button>
                            <button className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600">
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                Helpful ({review.likes})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
