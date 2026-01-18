'use client';

import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';

interface AdminDashboardProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
    stats: {
        blogs: number;
        docs: number;
        projects: number;
    };
}

export default function AdminDashboard({ user, stats }: AdminDashboardProps) {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    const statCards = [
        {
            title: 'Blog Posts',
            count: stats.blogs,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            href: '/admin/blog',
            color: 'accent',
        },
        {
            title: 'Documentation',
            count: stats.docs,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            href: '/admin/docs',
            color: 'blue',
        },
        {
            title: 'Projects',
            count: stats.projects,
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            ),
            href: '/admin/projects',
            color: 'green',
        },
    ];

    const quickActions = [
        { title: 'New Blog Post', href: '/admin/blog/new', icon: '📝' },
        { title: 'New Doc', href: '/admin/docs/new', icon: '📄' },
        { title: 'New Project', href: '/admin/projects/new', icon: '🚀' },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-10" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8"
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-accent-visible">
                        <span className="w-8 h-[1px] bg-accent-visible" />
                        <span className="text-xs font-black uppercase tracking-widest">Operational Command</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tightest leading-[0.8] uppercase">
                        COMMAND_CENTER<span className="text-foreground/10">_</span>
                    </h1>
                    <p className="text-muted font-mono text-sm uppercase tracking-widest">
                        AUTHENTICATED_AS: <span className="text-foreground">{user.name || user.email}</span>
                    </p>
                </div>

                <Button variant="outline" onClick={handleSignOut} className="h-14 px-8 rounded-2xl border-border/40 hover:border-accent-visible/60 transition-all group">
                    <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4 4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out Terminal
                </Button>
            </motion.div>

            {/* Main Bento Grid */}
            <div className="bento-grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                {/* Stats Bento Items */}
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bento-col-1 bento-row-1"
                    >
                        <Link href={stat.href}>
                            <div className="bento-item p-8 h-full flex flex-col justify-between group">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted group-hover:text-accent-visible transition-colors">
                                        {stat.title}
                                    </h3>
                                    <div className="text-accent-visible opacity-40 group-hover:opacity-100 transition-opacity">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-5xl font-bold font-display tracking-tightest mb-2 group-hover:scale-110 transition-transform origin-left">
                                        {stat.count.toString().padStart(2, '0')}
                                    </div>
                                    <div className="h-[1px] w-full bg-border/20 relative overflow-hidden">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-accent-visible opacity-40"
                                            animate={{ left: ["-100%", "100%"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {/* Quick Actions Bento Item */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bento-col-2 bento-row-1"
                >
                    <div className="bento-item p-8 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-6">Rapid Deployment</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {quickActions.map((action) => (
                                    <Link key={action.title} href={action.href} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-surface-elevated/20 border border-border/10 hover:border-accent-visible/40 hover:bg-accent-visible/5 transition-all group">
                                        <span className="text-2xl group-hover:scale-125 transition-transform">{action.icon}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted group-hover:text-accent-visible">{action.title.split(' ')[1]}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* System Intelligence: Data Flow & Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bento-col-2 bento-row-1"
                >
                    <div className="bento-item p-8 h-full flex flex-col justify-between overflow-hidden relative group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Logical_Distribution</h3>
                            <div className="flex gap-1">
                                <div className="w-1 h-3 bg-accent-visible/20 rounded-full" />
                                <div className="w-1 h-3 bg-accent-visible/40 rounded-full" />
                                <div className="w-1 h-3 bg-accent-visible/60 rounded-full animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'LOGS', count: stats.blogs, total: stats.blogs + stats.docs + stats.projects },
                                { label: 'BLUEPRINTS', count: stats.projects, total: stats.blogs + stats.docs + stats.projects },
                                { label: 'PROTOCOLS', count: stats.docs, total: stats.blogs + stats.docs + stats.projects },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-muted">
                                        <span>{item.label}</span>
                                        <span>{Math.round((item.count / (item.total || 1)) * 100)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-border/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.count / (item.total || 1)) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                            className="h-full bg-accent-visible/60"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Animated Data Stream Decorator */}
                        <div className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                            <svg className="w-full h-full" viewBox="0 0 400 100">
                                <motion.path
                                    d="M0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                    className="text-accent-visible"
                                    animate={{ d: ["M0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50", "M0 50 Q 50 80, 100 50 T 200 50 T 300 50 T 400 50", "M0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                {/* Content Management Extended Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bento-col-4 bento-row-1"
                >
                    <div className="bento-item p-10 flex flex-col md:flex-row justify-between items-center gap-8 bg-accent-visible/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[60px] font-black pointer-events-none group-hover:opacity-20 transition-opacity">
                            NODE_01
                        </div>
                        <div className="space-y-4 max-w-xl relative z-10">
                            <div className="flex items-center gap-4 mb-2">
                                <Badge variant="outline" className="border-accent-visible text-accent-visible text-[9px] px-2 py-0">STABLE</Badge>
                                <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">Structure_V4.2</span>
                            </div>
                            <h3 className="text-3xl font-bold font-display tracking-tightest">LOGICAL_ORCHESTRATOR</h3>
                            <p className="text-sm text-muted font-light leading-relaxed max-w-lg">
                                Access the core content engine. Manage the chronological record of logs, technical documentation, and project case studies. Deploy new system nodes with single-click primitives.
                            </p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto relative z-10">
                            <Link href="/admin/blog" className="flex-1 min-w-[140px]">
                                <Button variant="primary" className="w-full h-14 bg-accent-visible text-white font-black uppercase tracking-widest rounded-xl hover:shadow-[0_10px_30px_rgba(74,102,0,0.3)]">
                                    Blog_Core
                                </Button>
                            </Link>
                            <Link href="/admin/docs" className="flex-1 min-w-[140px]">
                                <Button variant="outline" className="w-full h-14 border-border/40 font-black uppercase tracking-widest rounded-xl hover:border-accent-visible/60 transition-all">
                                    Doc_Logic
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
