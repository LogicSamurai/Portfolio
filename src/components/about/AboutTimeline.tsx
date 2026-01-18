'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const timelineEvents = [
    {
        year: '2022',
        title: 'The Spark',
        description: 'Began exploring the world of software architecture and creative development. Fast-tracked fundamentals in TypeScript and modern web standards.',
    },
    {
        year: '2023',
        title: 'Deep Dive',
        description: 'Specialized in the React ecosystem. Built multiple full-stack applications focusing on user experience and real-time data.',
    },
    {
        year: '2024',
        title: 'Core Architecture',
        description: 'Mastered distributed systems and backend orchestration. Implemented high-performance database schemas using Prisma and PostgreSQL.',
    },
    {
        year: '2025',
        title: 'Scale & Performance',
        description: 'Architected scalable cloud-native solutions. Focused on accessibility, security protocols, and visual excellence in high-traffic applications.',
    },
    {
        year: '2026',
        title: 'The Realization',
        description: 'Launching SyntaxSamurai—a testament to 2026 web design principles. Combining technical precision with neo-noir aesthetics.',
    },
];

export default function AboutTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={containerRef} className="py-40 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-5" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-32 relative"
                    >
                        <div className="flex items-center gap-4 text-accent-visible mb-4">
                            <span className="w-12 h-[1px] bg-accent-visible" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">LOG_FILE_0x884</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-bold font-display tracking-tightest leading-[0.8] mb-8">
                            ARCHITECTURAL <br />
                            <span className="text-accent-visible">RECORD</span><span className="text-foreground/20">.</span>
                        </h2>
                        <p className="text-xl text-muted max-w-2xl font-light leading-relaxed">
                            A high-fidelity chronological account of technical breakthroughs and systemic evolution.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Vertical Architectural Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-border/20" />
                        <motion.div
                            style={{ scaleY, originY: 0 }}
                            className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-accent-visible shadow-[0_0_30px_rgba(74,102,0,0.4)] z-10"
                        />

                        {/* Events */}
                        <div className="space-y-40">
                            {timelineEvents.map((event, index) => (
                                <TimelineItem
                                    key={event.year}
                                    event={event}
                                    isRight={index % 2 === 0}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ event, isRight, index }: { event: any; isRight: boolean; index: number }) {
    return (
        <div className={`relative flex items-center justify-between gap-12 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Content Panel */}
            <div className="w-[45%] group">
                <motion.div
                    initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="relative"
                >
                    <div className="p-10 rounded-[32px] bg-surface-elevated/40 backdrop-blur-xl border border-border/20 group-hover:border-accent-visible/40 transition-all duration-700 relative overflow-hidden">
                        {/* Blueprint Corner Accent */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-accent-visible/20 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                                <span className="text-[9px] font-black font-mono text-accent-visible tracking-[0.3em] uppercase">Sector_0{index + 1}</span>
                                <span className="text-4xl font-bold font-display tracking-tightest block">{event.year}</span>
                            </div>
                            <div className="text-[10px] font-mono text-muted/40 uppercase tracking-widest">
                                Status: <span className="text-accent-visible/60">Verified</span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold font-display mb-4 text-foreground group-hover:translate-x-2 transition-transform">
                            {event.title.toUpperCase()}
                        </h3>
                        <p className="text-muted leading-relaxed font-light">
                            {event.description}
                        </p>

                        <div className="mt-8 pt-6 border-t border-border/10 flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-accent-visible/20" />
                            <div className="w-2 h-2 rounded-full bg-accent-visible/40" />
                            <div className="w-2 h-2 rounded-full bg-accent-visible/60" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Central Diagnostic Hub */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                <motion.div
                    initial={{ scale: 0, rotate: 45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 rounded-2xl bg-background border border-accent-visible/40 rotate-45 flex items-center justify-center group-hover:bg-accent-visible group-hover:text-white transition-all duration-500 shadow-2xl"
                >
                    <div className="w-3 h-3 border-2 border-current rounded-full animate-pulse" />
                </motion.div>
            </div>

            {/* Empty space for layout balance */}
            <div className="w-[45%]" />
        </div>
    );
}
