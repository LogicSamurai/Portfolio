'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import TechnicalPreview from '@/components/admin/TechnicalPreview';

const docSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase and only contain letters, numbers, and dashes'),
    description: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    published: z.boolean(),
    order: z.number(),
    folderId: z.string().min(1, 'Folder is required'),
    tags: z.string().optional(),
});

type DocFormValues = z.infer<typeof docSchema>;

interface DocFormProps {
    initialData?: any;
    isEditing?: boolean;
    folders: any[];
}

export default function DocForm({ initialData, isEditing = false, folders }: DocFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [viewMode, setViewMode] = useState<'STANDARD' | 'IDE' | 'ZEN'>('IDE');

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<DocFormValues>({
        resolver: zodResolver(docSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            description: initialData?.description || '',
            content: initialData?.content || '',
            published: initialData?.published ?? false,
            order: initialData?.order ?? 0,
            folderId: initialData?.folderId || '',
            tags: initialData?.tags?.join(', ') || '',
        },
    });

    const title = watch('title');
    const content = watch('content');
    const published = watch('published');
    const folderId = watch('folderId');

    const generateSlug = () => {
        if (title && !isEditing) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setValue('slug', slug);
        }
    };

    const onSubmit = async (data: DocFormValues) => {
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isEditing ? `/api/admin/docs/${initialData.id}` : '/api/admin/docs';
            const response = await fetch(endpoint, {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Failed to save document');
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
        <div className={`flex flex-col h-[calc(100vh-120px)] ${viewMode === 'ZEN' ? 'max-w-4xl mx-auto w-full' : ''}`}>
            {/* Developer Toolbar */}
            <div className="flex items-center justify-between py-4 border-b border-border/10 mb-6 shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent-visible animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">DOCUMENTATION_ENGINE_v4.5</span>
                    </div>
                    <div className="h-4 w-px bg-border/20" />
                    <div className="flex bg-surface-elevated/20 p-1 rounded-lg border border-border/10">
                        {(['STANDARD', 'IDE', 'ZEN'] as const).map((mode) => (
                            <button
                                key={mode}
                                type="button"
                                onClick={() => setViewMode(mode)}
                                className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded transition-all ${viewMode === mode
                                        ? 'bg-accent-visible text-white shadow-sm'
                                        : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        form="doc-form"
                        variant="primary"
                        size="sm"
                        disabled={isLoading}
                        className="px-8 font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                        {isLoading ? 'EXECUTING...' : 'COMMIT_SPEC_'}
                    </Button>
                </div>
            </div>

            <div className={`flex-1 overflow-hidden ${viewMode === 'STANDARD' ? 'grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto' : 'flex gap-8'}`}>
                {/* Main Authoring Area */}
                <div className={`flex flex-col h-full ${viewMode === 'ZEN' ? 'w-full' : viewMode === 'IDE' ? 'w-[70%]' : 'lg:col-span-2'}`}>
                    <form id="doc-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full space-y-6">
                        {/* Title Input */}
                        <div className="shrink-0 group">
                            <input
                                {...register('title')}
                                className="w-full bg-transparent border-none text-4xl md:text-5xl font-black font-display tracking-tightest placeholder:text-foreground/5 focus:ring-0 p-0 mb-2 transition-all uppercase"
                                placeholder="ENTER_PROTOCOL_SUBJECT..."
                                onBlur={generateSlug}
                            />
                            <div className="h-[1px] w-full bg-foreground/10 group-focus-within:bg-accent-visible transition-all duration-500" />
                            {errors.title && <p className="text-red-400 text-[10px] mt-2 uppercase font-black tracking-widest">{errors.title.message}</p>}
                        </div>

                        {/* Editor/Preview Split */}
                        <div className={`flex-1 flex gap-4 min-h-0 ${viewMode === 'IDE' ? 'flex-row' : 'flex-col'}`}>
                            <div className={`${viewMode === 'IDE' ? 'w-1/2' : 'w-full'} h-full flex flex-col`}>
                                <MarkdownEditor
                                    value={content}
                                    onChange={(val) => setValue('content', val, { shouldDirty: true })}
                                    className="flex-1 rounded-none border-border/10"
                                    placeholder="SYNTHESIZING_SPECIFICATIONS..."
                                />
                                {errors.content && <p className="text-red-400 text-[10px] mt-2 uppercase font-black tracking-widest">{errors.content.message}</p>}
                            </div>

                            {viewMode === 'IDE' && (
                                <div className="w-1/2 h-full">
                                    <TechnicalPreview content={content} />
                                </div>
                            )}
                        </div>

                        {/* Status Bar */}
                        <div className="shrink-0 flex items-center justify-between pt-6 border-t border-border/10">
                            <div className="flex gap-8 font-mono text-[9px] text-muted/60 uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-visible/40">NODE_TYPE:</span>
                                    <span>PROTOCOL_SRC</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-visible/40">LINES:</span>
                                    <span>{content.split('\n').length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-visible/40">SECTOR:</span>
                                    <span>{folders.find(f => f.id === folderId)?.name || 'NULL'}</span>
                                </div>
                            </div>
                            <div className="text-[9px] font-black tracking-widest text-muted/30">SYSTEM_ARCH_v4.5</div>
                        </div>
                    </form>
                </div>

                {/* Property Inspector (Sidebar) */}
                {viewMode !== 'ZEN' && (
                    <div className={`${viewMode === 'IDE' ? 'w-[30%]' : 'lg:col-span-1'} h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar`}>
                        <Card padding="lg" className="bg-surface-elevated/10 border-border/10 rounded-none relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-muted/20 rotate-90 origin-top-right uppercase">LOGIC_CONSTRAINTS</div>

                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-accent-visible">
                                <span className="w-3 h-3 border border-accent-visible flex items-center justify-center text-[7px]">λ</span>
                                HIERARCHY_PROPS
                            </h3>

                            <div className="space-y-8">
                                {error && (
                                    <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase">
                                        SYSTEM_FAULT: {error}
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">TARGET_SECTOR</label>
                                    <select
                                        {...register('folderId')}
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none appearance-none"
                                    >
                                        <option value="">SELECT_SECTOR</option>
                                        {folders.map((f) => (
                                            <option key={f.id} value={f.id}>{f.name.toUpperCase()}</option>
                                        ))}
                                    </select>
                                    {errors.folderId && <p className="text-red-500 text-[8px] uppercase tracking-widest">{errors.folderId.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">SLUG_IDENTIFIER</label>
                                    <input
                                        {...register('slug')}
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                    />
                                    {errors.slug && <p className="text-red-500 text-[8px] uppercase tracking-widest">{errors.slug.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">HIERARCHY_ORDER</label>
                                    <input
                                        type="number"
                                        {...register('order', { valueAsNumber: true })}
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-surface/20 border border-border/10 group/toggle hover:border-accent-visible/40 transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted group-hover/toggle:text-accent-visible transition-colors">INDEX_BREADCAST</label>
                                        <span className={`text-[10px] font-mono ${published ? 'text-accent-visible' : 'text-muted/40'}`}>
                                            {published ? 'LIVE_INDEX' : 'LOCAL_CACHE'}
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        {...register('published')}
                                        className="w-5 h-5 rounded-none border-border bg-surface text-accent-visible focus:ring-accent-visible cursor-pointer"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">TAXONOMY_TAGS</label>
                                    <input
                                        {...register('tags')}
                                        placeholder="architecture, protocol, core"
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                    />
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        fullWidth
                                        className="h-12 border-border/10 font-black uppercase tracking-widest text-[9px]"
                                        onClick={() => router.back()}
                                    >
                                        ABORT_DOC
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Node Health Visualizer */}
                        <div className="p-6 bg-accent-visible/5 border border-accent-visible/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent-visible/60">INTEGRITY_CHECK</span>
                                <span className="text-[8px] font-mono text-accent-visible">{folderId ? 'PASS' : 'WARN_NO_SECTOR'}</span>
                            </div>
                            <div className="h-1 bg-surface-elevated overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent-visible"
                                    initial={{ width: 0 }}
                                    animate={{ width: title && content && folderId ? '100%' : '60%' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
