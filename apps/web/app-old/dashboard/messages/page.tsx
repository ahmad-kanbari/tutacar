'use client';

import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState(1);
    const [messageInput, setMessageInput] = useState('');

    const conversations = [
        {
            id: 1,
            name: 'John Doe',
            lastMessage: 'When can I pick up my car?',
            time: '10:30 AM',
            unread: 2,
            avatar: 'JD',
        },
        {
            id: 2,
            name: 'Alice Smith',
            lastMessage: 'Thanks for the quick service!',
            time: 'Yesterday',
            unread: 0,
            avatar: 'AS',
        },
        {
            id: 3,
            name: 'Bob Jones',
            lastMessage: 'Is the part in stock?',
            time: 'Yesterday',
            unread: 0,
            avatar: 'BJ',
        },
    ];

    const messages = [
        { id: 1, sender: 'me', text: 'Hello John, your car is almost ready.', time: '10:00 AM' },
        { id: 2, sender: 'them', text: 'Great! When can I pick it up?', time: '10:15 AM' },
        { id: 3, sender: 'me', text: 'You can come by around 2 PM.', time: '10:20 AM' },
        { id: 4, sender: 'them', text: 'When can I pick up my car?', time: '10:30 AM' },
    ];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        // Logic to send message would go here
        setMessageInput('');
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Sidebar - Conversation List */}
            <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            className={`flex cursor-pointer items-center p-4 hover:bg-gray-100 ${activeChat === chat.id ? 'bg-white border-l-4 border-blue-500 shadow-sm' : ''
                                }`}
                        >
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                                {chat.avatar}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between">
                                    <h3 className="truncate font-medium text-gray-900">{chat.name}</h3>
                                    <span className="text-xs text-gray-500">{chat.time}</span>
                                </div>
                                <p className="truncate text-sm text-gray-500">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col bg-white">
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
                            JD
                        </div>
                        <div>
                            <h2 className="font-medium text-gray-900">John Doe</h2>
                            <p className="text-xs text-green-500">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <button className="rounded p-2 hover:bg-gray-100 hover:text-gray-600">
                            <Phone className="h-5 w-5" />
                        </button>
                        <button className="rounded p-2 hover:bg-gray-100 hover:text-gray-600">
                            <Video className="h-5 w-5" />
                        </button>
                        <button className="rounded p-2 hover:bg-gray-100 hover:text-gray-600">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'me'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p
                                    className={`mt-1 text-xs ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                                        }`}
                                >
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={!messageInput.trim()}
                            className="rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
