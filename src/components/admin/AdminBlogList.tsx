'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    createdAt: Date;
    author: {
        name: string | null;
    };
}

interface AdminBlogListProps {
    posts: BlogPost[];
}

export default function AdminBlogList({ posts }: AdminBlogListProps) {
    return (
        <div className="space-y-12">
            {/* Brutalist Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-8 border-b border-border/10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-accent-visible">
                        <span className="w-8 h-[1px] bg-accent-visible" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Module_Alpha</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tightest leading-[0.8] uppercase">
                        BLOG_REGISTRY<span className="text-foreground/10">_</span>
                    </h1>
                </div>
                <Link href="/admin/blog/new">
                    <Button variant="primary" className="h-16 px-10 font-black uppercase tracking-widest rounded-none shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                        DEPLOY_NEW_ENTRY
                    </Button>
                </Link>
            </div>

            {/* Terminal Registry */}
            <div className="relative group overflow-hidden">
                {/* Horizontal Scanline Decorator */}
                <div className="absolute top-0 left-0 w-full h-px bg-accent-visible/20 animate-scan opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="w-full border border-border/10 bg-surface/5 flex flex-col">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-[80px_1fr_150px_120px_180px] gap-4 px-6 py-4 bg-surface-elevated/20 border-b border-border/10 text-[9px] font-black uppercase tracking-[0.2em] text-muted">
                        <span>#_NODE</span>
                        <span>LOG_IDENTIFIER</span>
                        <span>STATUS</span>
                        <span>TIMESTORM</span>
                        <span className="text-right">OPERATIONS</span>
                    </div>

                    {posts.length === 0 ? (
                        <div className="p-20 text-center text-muted font-mono text-xs uppercase tracking-widest italic opacity-40">
                            SYSTEM_NULL: NO_RECORDS_INDEXED
                        </div>
                    ) : (
                        <div className="divide-y divide-border/5">
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="grid grid-cols-1 md:grid-cols-[80px_1fr_150px_120px_180px] gap-4 px-6 py-6 items-center hover:bg-accent-visible/5 transition-colors group/row"
                                >
                                    {/* NODE_ID */}
                                    <span className="font-mono text-[10px] text-muted/60">
                                        [{String(index + 1).padStart(2, '0')}]
                                    </span>

                                    {/* TITLE & SLUG */}
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <h3 className="text-lg font-bold font-display group-hover/row:text-accent-visible transition-colors truncate uppercase tracking-tight">
                                            {post.title}
                                        </h3>
                                        <span className="text-[10px] font-mono text-muted lowercase tracking-tighter opacity-60">
                                            /{post.slug}
                                        </span>
                                    </div>

                                    {/* STATUS */}
                                    <div>
                                        {post.published ? (
                                            <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-accent-visible/40 bg-accent-visible/5 rounded-full">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent-visible animate-pulse" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-accent-visible">LIVE_DEPLOY</span>
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-border/20 bg-surface/40 rounded-full">
                                                <div className="w-1.5 h-1.5 rounded-full bg-muted/40" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-muted">DRAFT_IDLE</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* DATE */}
                                    <span className="text-[10px] font-mono text-muted uppercase">
                                        {new Date(post.createdAt).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '.')}
                                    </span>

                                    {/* ACTIONS */}
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                        <Link href={`/admin/blog/edit/${post.id}`}>
                                            <button className="p-2 text-muted hover:text-accent-visible hover:bg-accent-visible/10 rounded transition-all text-[10px] uppercase font-black tracking-widest">
                                                EDIT
                                            </button>
                                        </Link>
                                        <button className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded transition-all text-[10px] uppercase font-black tracking-widest">
                                            PURGE
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
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
