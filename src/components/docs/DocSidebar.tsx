'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface DocSidebarProps {
    structure: any[];
}

export default function DocSidebar({ structure }: DocSidebarProps) {
    const pathname = usePathname();
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

    // Auto-expand folders based on current pathname
    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        if (pathSegments.length > 1 && pathSegments[0] === 'docs') {
            // Find folders that match the path
            const newExpanded: Record<string, boolean> = { ...expandedFolders };

            const findAndExpand = (items: any[], currentPath = '') => {
                items.forEach(item => {
                    const fullSlug = currentPath ? `${currentPath}/${item.slug}` : item.slug;
                    if (pathname.includes(`/docs/${fullSlug}`)) {
                        newExpanded[item.id] = true;
                        if (item.children) findAndExpand(item.children, fullSlug);
                    }
                });
            };

            findAndExpand(structure);
            setExpandedFolders(newExpanded);
        }
    }, [pathname, structure]);

    const toggleFolder = (id: string) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderTree = (items: any[], currentPath = '', depth = 0) => {
        return (
            <div className={`space-y-1 ${depth > 0 ? 'ml-3 border-l border-border/50 pl-4 mt-1' : ''}`}>
                {items.map((item) => {
                    const isFolder = item.hasOwnProperty('children');
                    const isExpanded = expandedFolders[item.id];
                    const fullPath = currentPath ? `${currentPath}/${item.slug}` : item.slug;

                    if (isFolder) {
                        return (
                            <div key={item.id} className="space-y-1">
                                <button
                                    onClick={() => toggleFolder(item.id)}
                                    className="w-full flex items-center justify-between text-left px-3 py-2 rounded-lg hover:bg-surface-elevated transition-colors group"
                                >
                                    <span className="text-sm font-semibold font-display text-accent-muted group-hover:text-accent transition-colors">
                                        {item.name}
                                    </span>
                                    <span className={`text-[10px] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                                        ▶
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            {/* Render subfolders */}
                                            {item.children.length > 0 && renderTree(item.children, fullPath, depth + 1)}

                                            {/* Render docs in this folder */}
                                            <div className="space-y-1 mt-1">
                                                {item.docs.map((doc: any) => {
                                                    const docPath = `/docs/${fullPath}/${doc.slug}`;
                                                    const isActive = pathname === docPath;

                                                    return (
                                                        <Link
                                                            key={doc.id}
                                                            href={docPath}
                                                            className={`block px-3 py-1.5 rounded-lg text-sm transition-all ${isActive
                                                                ? 'bg-accent/10 text-accent-visible font-medium border-l-2 border-accent -ml-[1px]'
                                                                : 'text-muted hover:text-foreground hover:bg-surface-elevated'
                                                                }`}
                                                        >
                                                            {doc.title}
                                                        </Link>
                                                    );
                                                })}
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
        <nav className="w-full">
            {structure.length > 0 ? (
                renderTree(structure)
            ) : (
                <p className="text-xs text-muted italic px-3">No docs available.</p>
            )}
        </nav>
    );
}
