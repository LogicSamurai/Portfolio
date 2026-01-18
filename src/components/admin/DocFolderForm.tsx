'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const folderSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase and only contain letters, numbers, and dashes'),
    description: z.string().optional(),
    parentId: z.string().nullable().optional(),
    order: z.number(),
});

type FolderFormValues = z.infer<typeof folderSchema>;

interface DocFolderFormProps {
    initialData?: any;
    isEditing?: boolean;
    folders?: any[]; // For parent selection
}

export default function DocFolderForm({ initialData, isEditing = false, folders = [] }: DocFolderFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FolderFormValues>({
        resolver: zodResolver(folderSchema),
        defaultValues: {
            name: initialData?.name || '',
            slug: initialData?.slug || '',
            description: initialData?.description || '',
            parentId: initialData?.parentId || null,
            order: initialData?.order ?? 0,
        },
    });

    const name = watch('name');

    // Auto-generate slug from name
    const generateSlug = () => {
        if (name && !isEditing) {
            const slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setValue('slug', slug);
        }
    };

    const onSubmit = async (data: FolderFormValues) => {
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isEditing ? `/api/admin/docs/folders/${initialData.id}` : '/api/admin/docs/folders';
            const response = await fetch(endpoint, {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Failed to save folder');
            }

            router.push('/admin/docs');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card padding="lg" className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-2xl font-bold font-display">{isEditing ? 'Edit Folder' : 'New Folder'}</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <Input
                    label="Folder Name"
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="e.g. Data Structures"
                    onBlur={generateSlug}
                    fullWidth
                />

                <Input
                    label="Slug"
                    {...register('slug')}
                    error={errors.slug?.message}
                    placeholder="data-structures"
                    fullWidth
                />

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted">Parent Folder</label>
                    <select
                        {...register('parentId')}
                        className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-accent focus:outline-none"
                    >
                        <option value="">None (Root)</option>
                        {folders
                            .filter(f => f.id !== initialData?.id) // Prevent selecting self as parent
                            .map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.name}
                                </option>
                            ))}
                    </select>
                </div>

                <Input
                    label="Description"
                    {...register('description')}
                    error={errors.description?.message}
                    placeholder="Brief overview of this category"
                    fullWidth
                />

                <Input
                    label="Order"
                    type="number"
                    {...register('order', { valueAsNumber: true })}
                    error={errors.order?.message}
                    fullWidth
                />

                <div className="flex gap-4 pt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : (isEditing ? 'Update Folder' : 'Create Folder')}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => router.back()}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Card>
    );
}
