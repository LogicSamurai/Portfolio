'use client';

import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface BlogPostProps {
    post: {
        id: string;
        title: string;
        description: string | null;
        content: string;
        tags: string[];
        readingTime: number | null;
        createdAt: Date;
        views: number;
        author: {
            name: string | null;
        };
    };
}

export default function BlogPost({ post }: BlogPostProps) {
    const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
    const [tableOfContents, setTableOfContents] = useState<{ id: string; title: string; level: number }[]>([]);

    useEffect(() => {
        async function prepareMDX() {
            const headings: { id: string; title: string; level: number }[] = [];
            const headingRegex = /^(#{1,3})\s+(.+)$/gm;
            let match;

            while ((match = headingRegex.exec(post.content)) !== null) {
                const level = match[1].length;
                const title = match[2];
                const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                headings.push({ id, title, level });
            }

            setTableOfContents(headings);

            const mdx = await serialize(post.content, {
                mdxOptions: {
                    development: false,
                },
            });

            setMdxSource(mdx);
        }

        prepareMDX();
    }, [post.content]);

    const components = {
        h1: (props: any) => <h1 id={props.children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="text-4xl font-bold font-display mt-20 mb-8 scroll-mt-24 tracking-tightest" {...props} />,
        h2: (props: any) => <h2 id={props.children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="text-3xl font-bold font-display mt-16 mb-6 scroll-mt-24 tracking-tightest" {...props} />,
        h3: (props: any) => <h3 id={props.children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="text-2xl font-bold font-display mt-12 mb-4 scroll-mt-24 tracking-tightest" {...props} />,
        p: (props: any) => <p className="text-lg text-foreground/90 leading-relaxed mb-8 font-light" {...props} />,
        ul: (props: any) => <ul className="list-disc list-outside ml-6 mb-8 space-y-3 text-foreground/80 font-light" {...props} />,
        ol: (props: any) => <ol className="list-decimal list-outside ml-6 mb-8 space-y-3 text-foreground/80 font-light" {...props} />,
        li: (props: any) => <li className="pl-2" {...props} />,
        a: (props: any) => <a className="text-accent-visible hover:underline underline-offset-4 decoration-2 transition-all" {...props} />,
        blockquote: (props: any) => (
            <blockquote className="border-l-[3px] border-accent-visible bg-accent-visible/5 px-8 py-6 my-10 rounded-r-2xl italic text-lg text-foreground/80" {...props} />
        ),
        code: (props: any) => {
            if (props.className) {
                return (
                    <div className="relative group my-10">
                        <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l border-accent-visible/20 rounded-tl-xl" />
                        <pre className="bg-surface-elevated/40 backdrop-blur-xl border border-border/20 rounded-2xl p-6 overflow-x-auto font-mono text-sm leading-relaxed shadow-lg">
                            <code {...props} />
                        </pre>
                    </div>
                );
            }
            return <code className="bg-accent-visible/10 px-2 py-0.5 rounded text-sm font-mono text-accent-visible" {...props} />;
        },
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 relative"
                >
                    <div className="flex items-center gap-4 text-accent-visible mb-8">
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent-visible" />
                            <div className="w-2 h-2 rounded-full bg-accent-visible/40" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">LOG_FILE_READ_ACCESS</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-10 tracking-tightest leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 justify-between pb-10 border-b border-border/10">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">PUBLISHED</span>
                                <span className="text-xs font-mono">
                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                            <div className="h-8 w-px bg-border/20" />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">DURATION</span>
                                <span className="text-xs font-mono">{post.readingTime || 5}_MIN_READ</span>
                            </div>
                            <div className="h-8 w-px bg-border/20" />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted mb-1">VISIBILITY</span>
                                <span className="text-xs font-mono text-accent-visible">PUBLIC_SECURE</span>
                            </div>
                        </div>

                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-[9px] border-accent-visible/20 text-accent-visible/80 font-black uppercase tracking-widest">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16 relative">
                    {/* Table of Contents - Desktop Sidebar */}
                    {tableOfContents.length > 0 && (
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-32 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-visible" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Navigation_Index</h2>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        {tableOfContents.map((heading) => (
                                            <li
                                                key={heading.id}
                                                style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
                                            >
                                                <a
                                                    href={`#${heading.id}`}
                                                    className="text-xs font-light text-muted hover:text-accent-visible transition-colors block border-l border-border/10 pl-4 py-1 hover:border-accent-visible/40"
                                                >
                                                    {heading.title.toUpperCase()}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                <div className="pt-8 opacity-20">
                                    <div className="h-px bg-gradient-to-r from-accent-visible to-transparent" />
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* Content */}
                    <motion.article
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 max-w-none"
                    >
                        {mdxSource ? (
                            <div className="prose prose-invert prose-headings:font-display max-w-none">
                                <MDXRemote {...mdxSource} components={components} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-visible"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted">DECODING_CONTENT...</span>
                            </div>
                        )}

                        {/* Termination Marker */}
                        <div className="mt-32 pt-20 border-t border-border/10 text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-background text-[10px] font-black uppercase tracking-[0.5em] text-muted">END_OF_TRANSMISSION</div>
                            <a
                                href="/blog"
                                className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-muted hover:text-accent-visible transition-all"
                            >
                                <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Return_to_Archive
                            </a>
                        </div>
                    </motion.article>
                </div>
            </div>
        </div>
    );
}
