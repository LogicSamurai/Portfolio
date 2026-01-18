'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Link from 'next/link';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    tags: string[];
    readingTime: number | null;
    createdAt: Date;
    author: {
        name: string | null;
    };
}

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Get all unique tags
    const allTags = Array.from(
        new Set(posts.flatMap((post) => post.tags))
    ).sort();

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Architectural Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20 relative"
            >
                <div className="flex items-center gap-4 text-accent-visible mb-4">
                    <span className="w-8 h-[1px] bg-accent-visible" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">LOG_FILE_DISPATCH</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold font-display leading-[0.85] tracking-tightest">
                    SYSTEM <br />
                    <span className="text-accent-visible">ARCHIVE</span><span className="text-foreground/20">.</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mt-8 font-light leading-relaxed">
                    A chronological journal of technical research, creative breakthroughs, and architectural observations.
                </p>
                <div className="absolute -right-8 top-0 opacity-5 hidden xl:block">
                    <span className="text-[180px] font-black font-display rotate-90 inline-block pointer-events-none select-none">JOURNAL</span>
                </div>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-16 space-y-8"
            >
                <div className="max-w-xl">
                    <Input
                        type="search"
                        placeholder="SEARCH_LOGS_..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        fullWidth
                        className="h-16 rounded-2xl border-border/20 bg-surface-elevated/20 focus:border-accent-visible/40 transition-all font-mono text-sm uppercase"
                    />
                </div>

                {/* Technical Filter Nodes */}
                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedTag === null
                                ? 'bg-accent-visible text-white shadow-lg'
                                : 'bg-surface-elevated/40 border border-border/10 text-muted hover:border-accent-visible/40 hover:text-foreground'
                                }`}
                        >
                            All_Sectors
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedTag === tag
                                    ? 'bg-accent-visible text-white shadow-lg'
                                    : 'bg-surface-elevated/40 border border-border/10 text-muted hover:border-accent-visible/40 hover:text-foreground'
                                    }`}
                            >
                                {tag.toUpperCase()}
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 border border-dashed border-border/20 rounded-[40px]"
                >
                    <p className="text-muted font-mono text-sm uppercase tracking-widest">ERROR: NO_LOGS_FOR_SPECIFIED_QUERY</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="p-8 rounded-[32px] bg-surface-elevated/30 backdrop-blur-xl border border-border/20 hover:border-accent-visible/40 transition-all duration-700 h-full flex flex-col group relative overflow-hidden">
                                    {/* Diagnostic ID */}
                                    <div className="absolute top-4 right-8 text-[8px] font-mono text-muted/20 tracking-widest uppercase">LOG_REF_{post.id.slice(0, 4)}</div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {post.tags.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-[9px] border-accent-visible/20 text-accent-visible/80 font-black uppercase tracking-widest">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl font-bold font-display mb-4 line-clamp-2 leading-tight tracking-tightest group-hover:text-accent-visible transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Description */}
                                    {post.description && (
                                        <p className="text-muted/80 font-light line-clamp-3 flex-1 leading-relaxed">
                                            {post.description}
                                        </p>
                                    )}

                                    {/* Meta Diagnostic */}
                                    <div className="flex items-center justify-between text-[10px] font-mono text-muted uppercase tracking-widest pt-6 mt-6 border-t border-border/10">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent-visible/40" />
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </div>
                                        {post.readingTime && (
                                            <div className="bg-surface-elevated/40 px-2 py-0.5 rounded">
                                                {post.readingTime}_MIN_READ
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
