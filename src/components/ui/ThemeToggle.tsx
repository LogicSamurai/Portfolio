'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (!mounted) return null;

    return (
        <motion.button
            onClick={toggleTheme}
            className="group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-surface-elevated/40 backdrop-blur-xl border border-border/20 hover:border-accent-visible/40 transition-all shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {/* Corner Diagnostic Marker */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-accent-visible/40 opacity-0 group-hover:opacity-100 transition-opacity" />

            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 0 : 360,
                    scale: theme === 'dark' ? 1 : 1.1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative z-10"
            >
                {theme === 'dark' ? (
                    <svg
                        className="w-5 h-5 text-accent-visible drop-shadow-[0_0_8px_rgba(163,230,0,0.4)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 text-accent-visible drop-shadow-[0_0_8px_rgba(163,230,0,0.4)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                )}
            </motion.div>

            {/* Scanning line effect on hover */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10 group-hover:opacity-20 pointer-events-none">
                <div className="w-full h-[1px] bg-accent-visible absolute top-0 left-0 animate-scan" />
            </div>
        </motion.button>
    );
}
