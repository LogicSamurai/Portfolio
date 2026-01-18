'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-20" />

            {/* Architectural Data Streams */}
            <div className="absolute inset-y-0 left-6 w-[1px] bg-border/20 -z-10" />
            <div className="absolute inset-y-0 right-6 w-[1px] bg-border/20 -z-10" />

            <div className="absolute left-8 top-1/2 -translate-y-1/2 -z-10 hidden lg:block">
                <div className="flex flex-col gap-8 text-[10px] font-mono text-muted uppercase tracking-[0.4em] [writing-mode:vertical-rl]">
                    <span>Performance Focused</span>
                    <div className="h-24 w-[1px] bg-accent/30 self-center" />
                    <span>User Centric</span>
                </div>
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 -z-10 hidden lg:block">
                <div className="flex flex-col gap-8 text-[10px] font-mono text-muted uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180">
                    <span>Clean Architecture</span>
                    <div className="h-24 w-[1px] bg-accent/30 self-center" />
                    <span>Scalable Systems</span>
                </div>
            </div>

            {/* Floating Geometric Elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <motion.div
                    className="absolute top-[15%] left-[10%] w-96 h-96 border border-accent/10 rounded-full"
                    animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[15%] right-[10%] w-72 h-72 border border-accent/5 rounded-full"
                    animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Animated greeting */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <span className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-accent-visible">
                            <span className="w-12 h-[1px] bg-accent-visible" />
                            Establishing Presence
                        </span>
                    </motion.div>

                    {/* Experimental Overlapping Heading */}
                    <div className="relative mb-20">
                        <motion.h1
                            className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-bold font-display leading-[0.8] tracking-tightest text-foreground select-none flex flex-col items-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.span
                                className="block z-10 mix-blend-difference group"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                SYNTAX<span className="text-accent-visible/20">.</span>
                            </motion.span>
                            <motion.span
                                className="block text-accent-visible -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 z-20 hover:italic transition-all duration-700 cursor-default"
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                SAMURAI
                            </motion.span>
                        </motion.h1>

                        {/* Background Floating Text */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02] text-[20rem] font-black pointer-events-none -z-10 uppercase tracking-tighter hidden xl:block">
                            CODE
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <p className="text-xl md:text-2xl text-muted font-light leading-relaxed max-w-xl">
                                Specialize in <span className="text-foreground font-medium">high-performance</span> digital architecture.
                                Blending technical precision with <span className="text-accent-visible font-bold">neo-noir</span> aesthetics.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 justify-start lg:justify-end items-start sm:items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <Link href="/projects" className="w-full sm:w-auto">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto h-16 px-10 rounded-full font-black uppercase tracking-widest bg-accent-visible text-white shadow-[0_10px_30px_rgba(74,102,0,0.3)] hover:shadow-[0_20px_50px_rgba(74,102,0,0.5)] transition-all">
                                        View Projects
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/about" className="group">
                                <span className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:gap-6 transition-all duration-500">
                                    The Architect
                                    <svg className="w-6 h-6 text-accent-visible" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Scroll indicator - Architectural style */}
                    <motion.div
                        className="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <div className="h-32 w-[1px] bg-gradient-to-b from-border/50 to-transparent relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-8 bg-accent-visible"
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
