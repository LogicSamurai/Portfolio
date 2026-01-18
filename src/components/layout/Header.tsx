'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import { useState } from 'react';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Docs', href: '/docs' },
];

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/60 backdrop-blur-2xl">
            {/* Top Diagnostic Bar */}
            <div className="border-b border-border/10 bg-surface-elevated/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-6 text-[8px] font-mono text-muted uppercase tracking-[0.3em]">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-accent-visible animate-pulse" />
                            SYS_STABLE
                        </span>
                        <span>LOC: DIGITAL_ETHER</span>
                    </div>
                    <div className="hidden sm:block">
                        USER_AUTH: <span className="text-accent-visible">0xSYNTX</span>
                    </div>
                </div>
            </div>

            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Architectural Logo */}
                    <Link href="/" className="group flex items-center gap-4">
                        <div className="relative">
                            <div className="w-10 h-10 border border-accent-visible/40 rounded-xl flex items-center justify-center group-hover:bg-accent-visible group-hover:text-black transition-all duration-500">
                                <span className="text-xs font-black font-display tracking-tightest">0X</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-visible opacity-50" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold font-display tracking-tightest leading-none">
                                SYNTAX<span className="text-accent-visible">SAMURAI</span>
                            </span>
                            <span className="text-[9px] font-mono text-muted uppercase tracking-widest mt-1">CORE_ORCHESTRATOR</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - System Nodes */}
                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/' && pathname?.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative group px-1 flex flex-col items-center"
                                >
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive
                                            ? 'bg-accent-visible text-white shadow-lg'
                                            : 'text-muted group-hover:text-foreground'
                                        }`}>
                                        {item.name}
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="header-dot"
                                            className="w-1 h-1 rounded-full bg-accent-visible mt-1 shadow-[0_0_10px_rgba(163,230,0,0.8)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <div className="w-px h-6 bg-border/20 mx-4" />
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-3 rounded-xl bg-surface-elevated/40 border border-border/20 text-foreground"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation - Expanded Archive */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-8 border-t border-border/10 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 gap-4">
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/' && pathname?.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="group relative flex items-center justify-between p-4 rounded-2xl bg-surface-elevated/20 border border-border/20 transition-all hover:border-accent-visible/40"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-mono text-muted/40">0{index + 1}</span>
                                            <span className={`text-xl font-bold font-display uppercase tracking-tightest ${isActive ? 'text-accent-visible' : 'text-foreground'
                                                }`}>
                                                {item.name}
                                            </span>
                                        </div>
                                        {isActive && <div className="w-2 h-2 rounded-full bg-accent-visible shadow-[0_0_10px_rgba(163,230,0,0.8)]" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </nav>
        </header>
    );
}
