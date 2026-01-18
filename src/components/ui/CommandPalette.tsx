'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface RegistryItem {
    id: string;
    title: string;
    slug: string;
    category: string;
    type: 'BLOG' | 'PROJECT' | 'DOC';
    url: string;
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [registry, setRegistry] = useState<RegistryItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch registry on first open
    useEffect(() => {
        if (isOpen && registry.length === 0) {
            setIsLoading(true);
            fetch('/api/registry')
                .then(res => res.json())
                .then(data => {
                    setRegistry(data);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [isOpen, registry.length]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Filtered results
    const filteredItems = registry.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    // Handle Selection
    const handleSelect = useCallback((url: string) => {
        router.push(url);
        setIsOpen(false);
        setQuery('');
    }, [router]);

    // Keyboard Navigation in Modal
    useEffect(() => {
        if (!isOpen) return;

        const handleModalKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % Math.max(filteredItems.length, 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(filteredItems.length, 1));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    handleSelect(filteredItems[selectedIndex].url);
                }
            }
        };

        window.addEventListener('keydown', handleModalKey);
        return () => window.removeEventListener('keydown', handleModalKey);
    }, [isOpen, filteredItems, selectedIndex, handleSelect]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-background/80 backdrop-blur-3xl"
                    />

                    {/* Palette Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-surface-elevated/40 border border-border/40 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,255,255,0.05)] backdrop-blur-xl"
                    >
                        {/* Terminal Header */}
                        <div className="px-6 py-4 border-b border-border/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent-visible animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">SYSTEM_INDEX_V1.0</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-muted/40 uppercase tracking-widest px-1.5 py-0.5 border border-border/20 rounded">ESC_TO_CLOSE</span>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="p-6">
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 p-0 text-2xl font-display font-bold placeholder:text-foreground/10 uppercase tracking-tightest"
                                placeholder="INITIALIZING_SEARCH_QUERY_..."
                            />
                        </div>

                        {/* Results Area */}
                        <div className="px-2 pb-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {isLoading ? (
                                <div className="p-12 flex flex-col items-center justify-center gap-4">
                                    <div className="w-8 h-[1px] bg-accent-visible animate-width-expand" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-visible/60 animate-pulse">Syncing_Registry...</span>
                                </div>
                            ) : filteredItems.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredItems.map((item, idx) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSelect(item.url)}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className={`w-full group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 text-left ${selectedIndex === idx ? 'bg-accent-visible/10 border-accent-visible/20' : 'hover:bg-surface/30'}`}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-colors ${selectedIndex === idx ? 'bg-accent-visible text-white border-accent-visible' : 'bg-surface border-border/20 text-muted'}`}>
                                                        {item.type}
                                                    </span>
                                                    <span className={`text-sm font-bold tracking-tight transition-colors ${selectedIndex === idx ? 'text-accent-visible' : 'text-foreground/80'}`}>
                                                        {item.title}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono text-muted/60 uppercase tracking-wider ml-[52px]">
                                                    {item.category} // {item.slug}
                                                </span>
                                            </div>

                                            {/* Selection Marker */}
                                            {selectedIndex === idx && (
                                                <motion.div
                                                    layoutId="cursor"
                                                    className="absolute -left-1 top-4 bottom-4 w-1 bg-accent-visible rounded-full"
                                                />
                                            )}

                                            <div className={`text-[10px] font-mono transition-opacity duration-300 ${selectedIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                                                [ENTER_TO_VIEW]
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : query && (
                                <div className="p-12 text-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted/40">NO_RECORDS_MATCH_QUERY</span>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions Footer */}
                        <div className="px-6 py-4 bg-surface-elevated/20 border-t border-border/10 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-surface border border-border/20 text-[9px] font-mono shadow-sm">↓↑</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted/60">Navigate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1 rounded bg-surface border border-border/20 text-[9px] font-mono shadow-sm">↵</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted/60">Select</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
