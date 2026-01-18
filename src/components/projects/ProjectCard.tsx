'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
    project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full group"
        >
            <Link href={`/projects/${project.slug}`}>
                <Card className="h-full flex flex-col overflow-hidden bg-surface-elevated/20 backdrop-blur-sm border-border/40 hover:border-accent-visible/40 transition-all duration-700 shadow-2xl relative">
                    {/* Project Image Container with Blueprint Peek */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-black/40 transition-colors">
                        {project.imageUrl && (
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-40 grayscale group-hover:grayscale-0"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}

                        {/* Blueprint Peek SVG Overlay */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 flex items-center justify-center">
                            <svg className="w-full h-full text-accent-visible/30" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 10 H100 M0 30 H100 M0 50 H100 M0 70 H100 M0 90 H100"
                                    stroke="currentColor"
                                    strokeWidth="0.1"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2 }}
                                />
                                <motion.path
                                    d="M10 0 V100 M30 0 V100 M50 0 V100 M70 0 V100 M90 0 V100"
                                    stroke="currentColor"
                                    strokeWidth="0.1"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2 }}
                                />
                                {/* Diagnostic Circles */}
                                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" className="animate-pulse" />
                                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                            </svg>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                        {/* Feature Tags */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-30">
                            {project.featured && (
                                <Badge
                                    variant="accent"
                                    className="font-black text-[9px] tracking-[0.2em] shadow-2xl uppercase h-6 px-3 bg-accent-visible text-white"
                                >
                                    PRIMARY_OBJECTIVE
                                </Badge>
                            )}
                            <Badge
                                variant="outline"
                                className="bg-black/40 backdrop-blur-md border-white/10 text-white/80 font-bold text-[9px] uppercase tracking-widest h-6 px-3"
                            >
                                {project.category}
                            </Badge>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-10 flex-1 flex flex-col relative">
                        {/* Sector ID */}
                        <div className="absolute top-6 right-10 text-[9px] font-mono text-muted uppercase tracking-[0.4em] opacity-30">
                            SEC_{project.slug.slice(0, 3).toUpperCase()}
                        </div>

                        <div className="mb-6">
                            <h3 className="text-3xl font-bold font-display text-foreground group-hover:text-accent-visible transition-colors duration-500 mb-4">
                                {project.title}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {project.technologies.slice(0, 3).map((tech: string) => (
                                    <div key={tech} className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-accent-visible/60" />
                                        <span className="text-[10px] uppercase tracking-widest text-muted font-black group-hover:text-accent-visible/80 transition-colors">
                                            {tech}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-muted text-sm line-clamp-2 leading-relaxed mb-10 flex-1 font-light italic opacity-80 group-hover:opacity-100 transition-opacity">
                            {project.description}
                        </p>

                        <div className="flex items-center justify-between pt-8 border-t border-border/20">
                            <span className="text-[10px] font-black font-display uppercase tracking-[0.3em] text-accent-visible flex items-center gap-2 group-hover:gap-6 transition-all">
                                Analyze Architecture
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
