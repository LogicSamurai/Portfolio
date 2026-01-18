'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminProjectListProps {
    initialProjects: any[];
}

export default function AdminProjectList({ initialProjects }: AdminProjectListProps) {
    const [projects, setProjects] = useState(initialProjects);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        setIsDeleting(id);
        try {
            const response = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete project');

            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error(error);
            alert('Failed to delete project');
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="space-y-12">
            {/* Brutalist Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-8 border-b border-border/10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-accent-visible">
                        <span className="w-8 h-[1px] bg-accent-visible" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Module_Gamma</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tightest leading-[0.8] uppercase">
                        BLUEPRINT_VAULT<span className="text-foreground/10">_</span>
                    </h1>
                </div>
                <Link href="/admin/projects/new">
                    <Button variant="primary" className="h-16 px-10 font-black uppercase tracking-widest rounded-none shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        INITIALIZE_NEW_BUILD
                    </Button>
                </Link>
            </div>

            {/* Technical Registry */}
            <div className="relative group overflow-hidden border border-border/10 bg-surface/5">
                {/* Horizontal Scanline Decorator */}
                <div className="absolute top-0 left-0 w-full h-px bg-accent-visible/20 animate-scan opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="w-full flex flex-col">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-[80px_1fr_180px_150px_120px_180px] gap-4 px-6 py-4 bg-surface-elevated/20 border-b border-border/10 text-[9px] font-black uppercase tracking-[0.2em] text-muted">
                        <span>#_NODE</span>
                        <span>DESIGNATION</span>
                        <span>ARCHITECTURE</span>
                        <span>BUILD_STATUS</span>
                        <span>TIMESTAMP</span>
                        <span className="text-right">OPERATIONS</span>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {projects.length === 0 ? (
                            <div className="p-20 text-center text-muted font-mono text-xs uppercase tracking-widest italic opacity-40">
                                SYSTEM_NULL: NO_BLUEPRINTS_FOUND
                            </div>
                        ) : (
                            <div className="divide-y divide-border/5">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="grid grid-cols-1 md:grid-cols-[80px_1fr_180px_150px_120px_180px] gap-4 px-6 py-6 items-center hover:bg-accent-visible/5 transition-colors group/row"
                                    >
                                        {/* NODE_ID */}
                                        <span className="font-mono text-[10px] text-muted/60">
                                            [{String(index + 1).padStart(2, '0')}]
                                        </span>

                                        {/* DESIGNATION (Title) */}
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <h3 className="text-lg font-bold font-display group-hover/row:text-accent-visible transition-colors truncate uppercase tracking-tight">
                                                {project.title}
                                            </h3>
                                            <span className="text-[10px] font-mono text-muted lowercase tracking-tighter opacity-60">
                                                src/projects/{project.slug}
                                            </span>
                                        </div>

                                        {/* ARCHITECTURE (Category) */}
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted/80">
                                            {project.category}
                                        </span>

                                        {/* BUILD_STATUS */}
                                        <div className="flex gap-2">
                                            {project.published ? (
                                                <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-accent-visible/40 bg-accent-visible/5 rounded-none">
                                                    <div className="w-1.5 h-1.5 bg-accent-visible animate-pulse" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-accent-visible">STABLE</span>
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-border/20 bg-surface/40 rounded-none">
                                                    <div className="w-1.5 h-1.5 bg-muted/40" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted">DRAFT</span>
                                                </div>
                                            )}
                                            {project.featured && (
                                                <div className="px-2 py-0.5 bg-accent-visible text-white text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#000]">
                                                    PRIORITY
                                                </div>
                                            )}
                                        </div>

                                        {/* TIMESTAMP */}
                                        <span className="text-[10px] font-mono text-muted uppercase">
                                            {new Date(project.createdAt).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '.')}
                                        </span>

                                        {/* OPERATIONS */}
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                            <Link href={`/admin/projects/edit/${project.id}`}>
                                                <button className="p-2 text-muted hover:text-accent-visible hover:bg-accent-visible/10 rounded transition-all text-[10px] uppercase font-black tracking-widest">
                                                    DEPLOY_EDIT
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                disabled={isDeleting === project.id}
                                                className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded transition-all text-[10px] uppercase font-black tracking-widest disabled:opacity-30"
                                            >
                                                {isDeleting === project.id ? 'SYC...' : 'PURGE'}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Back to Base */}
            <div className="pt-8">
                <Link href="/admin" className="inline-flex items-center gap-3 text-muted hover:text-accent-visible transition-colors group">
                    <span className="text-xs group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">RETURN_TO_COMMAND</span>
                </Link>
            </div>
        </div>
    );
}
