'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface AdminDocListProps {
    structure: any[];
}

export default function AdminDocList({ structure }: AdminDocListProps) {
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(() => {
        // Expand all by default for high-density view
        const initial: Record<string, boolean> = {};
        structure.forEach(folder => initial[folder.id] = true);
        return initial;
    });

    const toggleFolder = (id: string) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDeleteDoc = async (id: string) => {
        if (!confirm('Are you sure you want to delete this document?')) return;
        try {
            const response = await fetch(`/api/admin/docs/${id}`, { method: 'DELETE' });
            if (response.ok) window.location.reload();
        } catch (error) {
            console.error('Error deleting doc:', error);
        }
    };

    const handleDeleteFolder = async (id: string) => {
        if (!confirm('Are you sure you want to delete this folder and all its contents?')) return;
        try {
            const response = await fetch(`/api/admin/docs/folders/${id}`, { method: 'DELETE' });
            if (response.ok) window.location.reload();
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const renderTree = (items: any[], depth = 0, isLast = true) => {
        return (
            <div className={`space-y-1 ${depth > 0 ? 'ml-4' : ''}`}>
                {items.map((item, index) => {
                    const isFolder = item.hasOwnProperty('children');
                    const isExpanded = expandedFolders[item.id];
                    const isFolderLast = index === items.length - 1;

                    if (isFolder) {
                        return (
                            <div key={item.id} className="space-y-1">
                                <div className="flex items-center justify-between group py-2 px-3 hover:bg-accent-visible/5 transition-colors border-l border-border/10">
                                    <div
                                        className="flex items-center gap-3 cursor-pointer flex-1"
                                        onClick={() => toggleFolder(item.id)}
                                    >
                                        <span className="text-muted/40 font-mono text-[10px]">
                                            {depth > 0 ? (isFolderLast ? '└─' : '├─') : '::'}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-90 text-accent-visible' : 'text-muted/40'}`}>
                                                ▶
                                            </span>
                                            <span className="font-bold font-display uppercase tracking-tight group-hover:text-accent-visible transition-colors">
                                                {item.name}
                                            </span>
                                            <span className="text-[9px] font-mono text-muted/40 uppercase tracking-widest">
                                                [{item.docs.length + item.children.length}_ITEMS]
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleDeleteFolder(item.id)}
                                            className="text-[9px] font-black uppercase tracking-widest text-muted hover:text-red-500 transition-colors"
                                        >
                                            [PURGE_FOLDER]
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-l border-border/10 ml-[9px]">
                                                {/* Render subfolders */}
                                                {item.children.length > 0 && renderTree(item.children, depth + 1, false)}

                                                {/* Render docs in this folder */}
                                                <div className="space-y-1">
                                                    {item.docs.map((doc: any, docIndex: number) => {
                                                        const isDocLast = docIndex === item.docs.length - 1 && item.children.length === 0;
                                                        return (
                                                            <div key={doc.id} className="flex items-center justify-between group py-2 px-3 hover:bg-accent-visible/5 transition-colors ml-4">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-muted/40 font-mono text-[10px]">
                                                                        {isDocLast ? '└─' : '├─'}
                                                                    </span>
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-[10px] text-muted/40 font-mono">CODE_SRC</span>
                                                                        <span className="text-sm font-bold tracking-tight uppercase group-hover:text-accent-visible transition-colors">
                                                                            {doc.title}
                                                                        </span>
                                                                        {doc.published ? (
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-visible shadow-[0_0_8px_rgba(212,255,0,0.4)]" />
                                                                        ) : (
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-muted/20" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <Link href={`/admin/docs/edit/${doc.id}`}>
                                                                        <button className="text-[9px] font-black uppercase tracking-widest text-muted hover:text-accent-visible transition-colors">
                                                                            [DEPLOY_EDIT]
                                                                        </button>
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleDeleteDoc(doc.id)}
                                                                        className="text-[9px] font-black uppercase tracking-widest text-muted hover:text-red-500 transition-colors"
                                                                    >
                                                                        [PURGE_NODE]
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    return (
        <div className="space-y-12">
            {/* Brutalist Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-8 border-b border-border/10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-accent-visible">
                        <span className="w-8 h-[1px] bg-accent-visible" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Module_Beta</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tightest leading-[0.8] uppercase">
                        PROTOCOL_TREE<span className="text-foreground/10">_</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/docs/folder/new">
                        <Button variant="outline" className="h-14 px-8 font-black uppercase tracking-widest border-border/20 hover:border-accent-visible transition-all">
                            NEW_COLLECTION
                        </Button>
                    </Link>
                    <Link href="/admin/docs/new">
                        <Button variant="primary" className="h-14 px-10 font-black uppercase tracking-widest shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                            INITIALIZE_PROTOCOL
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hierarchical Tree Registry */}
            <div className="relative group border border-border/10 bg-surface/5 p-6">
                {/* Horizontal Scanline Decorator */}
                <div className="absolute top-0 left-0 w-full h-px bg-accent-visible/20 animate-scan opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {structure.length > 0 ? (
                    renderTree(structure)
                ) : (
                    <div className="p-20 text-center text-muted font-mono text-xs uppercase tracking-widest italic opacity-40">
                        SYSTEM_NULL: NO_STRUCTURE_INDEXED
                    </div>
                )}
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
