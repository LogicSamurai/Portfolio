'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ImageUpload from '@/components/admin/ImageUpload';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import TechnicalPreview from '@/components/admin/TechnicalPreview';

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().min(1, 'Description is required'),
    content: z.string(),
    technologies: z.string().min(1, 'At least one technology is required'),
    category: z.string().min(1, 'Category is required'),
    featured: z.boolean(),
    published: z.boolean(),
    githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    liveUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    order: z.number(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'STANDARD' | 'IDE' | 'ZEN'>('IDE');

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData ? {
            ...initialData,
            technologies: initialData.technologies.join(', '),
            githubUrl: initialData.githubUrl || '',
            liveUrl: initialData.liveUrl || '',
            imageUrl: initialData.imageUrl || '',
            content: initialData.content || '',
            featured: !!initialData.featured,
            published: !!initialData.published,
        } : {
            title: '',
            slug: '',
            description: '',
            content: '',
            category: '',
            featured: false,
            published: false,
            order: 0,
            technologies: '',
            githubUrl: '',
            liveUrl: '',
            imageUrl: '',
        },
    });

    const title = watch('title');
    const content = watch('content');
    const published = watch('published');
    const featured = watch('featured');

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && title) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', generatedSlug);
        }
    }, [title, setValue, isEditing]);

    const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
        setIsLoading(true);
        setError(null);

        const formattedData = {
            ...data,
            technologies: data.technologies.split(',').map(t => t.trim()).filter(t => t !== ''),
        };

        try {
            const url = isEditing
                ? `/api/admin/projects/${initialData.id}`
                : '/api/admin/projects';

            const response = await fetch(url, {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save project');
            }

            router.push('/admin/projects');
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
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">ARCHITECT_SPEC_v2.0</span>
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
                        form="project-form"
                        variant="primary"
                        size="sm"
                        disabled={isLoading}
                        className="px-8 font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                        {isLoading ? 'SYNCING...' : 'COMMIT_ARCH_'}
                    </Button>
                </div>
            </div>

            <div className={`flex-1 overflow-hidden ${viewMode === 'STANDARD' ? 'grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto' : 'flex gap-8'}`}>
                {/* Main Authoring Area */}
                <div className={`flex flex-col h-full ${viewMode === 'ZEN' ? 'w-full' : viewMode === 'IDE' ? 'w-[70%]' : 'lg:col-span-2'}`}>
                    <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full space-y-6">
                        {/* Title Input */}
                        <div className="shrink-0 group">
                            <input
                                {...register('title')}
                                className="w-full bg-transparent border-none text-4xl md:text-5xl font-black font-display tracking-tightest placeholder:text-foreground/5 focus:ring-0 p-0 mb-2 transition-all uppercase"
                                placeholder="ENTER_BLUEPRINT_ID..."
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
                                    placeholder="INITIATING_CORE_DOCUMENTATION..."
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
                                    <span className="text-accent-visible/40">COMPILATION:</span>
                                    <span>STABLE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-visible/40">SIZE:</span>
                                    <span>{content.length}_BYTES</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-accent-visible/40">ID:</span>
                                    <span>{watch('slug') || 'NULL'}</span>
                                </div>
                            </div>
                            <div className="text-[9px] font-black tracking-widest text-muted/30">MODULE_ALPHA_SECURE</div>
                        </div>
                    </form>
                </div>

                {/* Property Inspector (Sidebar) */}
                {viewMode !== 'ZEN' && (
                    <div className={`${viewMode === 'IDE' ? 'w-[30%]' : 'lg:col-span-1'} h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar`}>
                        <Card padding="lg" className="bg-surface-elevated/10 border-border/10 rounded-none relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-muted/20 rotate-90 origin-top-right uppercase">BLUEPRINT_INSPECTOR</div>

                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-accent-visible">
                                <span className="w-3 h-3 border border-accent-visible flex items-center justify-center text-[7px]">Δ</span>
                                SYSTEM_PROPS
                            </h3>

                            <div className="space-y-8">
                                {error && (
                                    <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase">
                                        BUILD_ERROR: {error}
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">SLUG_ID</label>
                                    <input
                                        {...register('slug')}
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                    />
                                    {errors.slug && <p className="text-red-500 text-[8px] uppercase tracking-widest">{errors.slug.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">ABSTRACT_SUMMARY</label>
                                    <textarea
                                        {...register('description')}
                                        rows={3}
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none resize-none"
                                    />
                                    {errors.description && <p className="text-red-500 text-[8px] uppercase tracking-widest">{errors.description.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">TECH_STACK</label>
                                    <input
                                        {...register('technologies')}
                                        placeholder="REACT, NEXT, TS"
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-muted uppercase tracking-widest block">COLLECTION</label>
                                    <input
                                        {...register('category')}
                                        placeholder="WEB_APPLICATION"
                                        className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-xs focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-muted uppercase tracking-widest block">REPO_SRC</label>
                                        <input
                                            {...register('githubUrl')}
                                            className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-[10px] focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-muted uppercase tracking-widest block">LIVE_ID</label>
                                        <input
                                            {...register('liveUrl')}
                                            className="w-full bg-surface/40 border border-border/10 p-3 font-mono text-[10px] focus:border-accent-visible/40 transition-colors focus:ring-0 outline-none"
                                        />
                                    </div>
                                </div>

                                <ImageUpload
                                    value={watch('imageUrl') || ''}
                                    onChange={(url) => setValue('imageUrl', url)}
                                    folder="projects"
                                    label="VISUAL_BLUEPRINT"
                                />

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between p-4 bg-surface/20 border border-border/10 group/toggle hover:border-accent-visible/40 transition-colors">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted">PRIORITY_FLAG</label>
                                            <span className={`text-[10px] font-mono ${featured ? 'text-accent-visible' : 'text-muted/40'}`}>
                                                {featured ? 'FEATURED_UNIT' : 'STANDARD_UNIT'}
                                            </span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            {...register('featured')}
                                            className="w-5 h-5 rounded-none border-border bg-surface text-accent-visible focus:ring-accent-visible cursor-pointer"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-surface/20 border border-border/10 group/toggle hover:border-accent-visible/40 transition-colors">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted">DEPLOY_STATUS</label>
                                            <span className={`text-[10px] font-mono ${published ? 'text-accent-visible' : 'text-muted/40'}`}>
                                                {published ? 'BROADCAST_LIVE' : 'INTERNAL_BUILD'}
                                            </span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            {...register('published')}
                                            className="w-5 h-5 rounded-none border-border bg-surface text-accent-visible focus:ring-accent-visible cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        fullWidth
                                        className="h-12 border-border/10 font-black uppercase tracking-widest text-[9px]"
                                        onClick={() => router.back()}
                                    >
                                        ABORT_BUILD
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Build Health Visualizer */}
                        <div className="p-6 bg-accent-visible/5 border border-accent-visible/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent-visible/60">CONSTRUCTION_QUALITY</span>
                                <span className="text-[8px] font-mono text-accent-visible">{title && content && watch('imageUrl') ? 'OPTIMAL' : 'INCOMPLETE'}</span>
                            </div>
                            <div className="h-1 bg-surface-elevated overflow-hidden">
                                <motion.div
                                    className="h-full bg-accent-visible"
                                    initial={{ width: 0 }}
                                    animate={{ width: title && content ? '100%' : '50%' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
