'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Plus, Edit, Trash, FileText } from 'lucide-react';

export default function ContentManagement() {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<any>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General',
        slug: '',
        readTimeMinutes: 5,
    });

    const { data, isLoading, refetch } = trpc.admin.listArticles.useQuery({
        page,
        limit: 10,
    });

    const mutation = trpc.admin.manageContent.useMutation({
        onSuccess: () => {
            setIsModalOpen(false);
            setEditingArticle(null);
            resetForm();
            refetch();
        },
    });

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            category: 'General',
            slug: '',
            readTimeMinutes: 5,
        });
    };

    const handleOpenModal = (article?: any) => {
        if (article) {
            setEditingArticle(article);
            setFormData({
                title: article.title,
                content: article.content,
                category: article.category,
                slug: article.slug,
                readTimeMinutes: article.read_time_minutes,
            });
        } else {
            setEditingArticle(null);
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingArticle) {
            mutation.mutate({
                action: 'update',
                id: editingArticle.id,
                data: formData,
            });
        } else {
            mutation.mutate({
                action: 'create',
                data: formData,
            });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this article?')) {
            mutation.mutate({ action: 'delete', id });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Article
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading articles...</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data?.articles.map((article) => (
                        <div key={article.id} className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                                        {article.category}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleOpenModal(article)}
                                            className="text-gray-400 hover:text-gray-500"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="text-red-400 hover:text-red-500"
                                        >
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{article.title}</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                                        {article.content}
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <FileText className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                                    {article.read_time_minutes} min read
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {editingArticle ? 'Edit Article' : 'New Article'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                                <textarea
                                    required
                                    rows={6}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Read Time (min)</label>
                                <input
                                    type="number"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.readTimeMinutes}
                                    onChange={(e) => setFormData({ ...formData, readTimeMinutes: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    {editingArticle ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
