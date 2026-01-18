'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGridProps {
    projects: any[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="space-y-12">
            {/* Filter Controls - Explicit High Contrast */}
            <div className="flex flex-wrap items-center justify-center gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`relative px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-tightest transition-all duration-500 border ${filter === category
                                ? 'border-[#d4ff00] shadow-[0_0_30px_rgba(212,255,0,0.35)] scale-105'
                                : 'bg-surface-elevated/40 backdrop-blur-md border-border/40 text-[#bbbbbb] hover:text-foreground hover:border-[#d4ff00]/40 shadow-sm'
                            }`}
                    >
                        <span
                            className="relative z-20 transition-colors duration-300"
                            style={{ color: filter === category ? '#000000' : undefined }}
                        >
                            {category}
                        </span>

                        {filter === category && (
                            <motion.div
                                layoutId="activePillGlobal"
                                className="absolute inset-0 rounded-full z-10"
                                style={{ backgroundColor: '#d4ff00' }}
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-32 border-2 border-dashed border-border/50 rounded-3xl">
                    <p className="text-muted italic text-lg font-light">
                        No projects found in the <span className="text-foreground font-bold not-italic">{filter}</span> category.
                    </p>
                </div>
            )}
        </div>
    );
}
