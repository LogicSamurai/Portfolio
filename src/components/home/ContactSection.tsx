'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function ContactSection() {
    return (
        <section className="py-40 relative overflow-hidden bg-background/50 backdrop-blur-3xl border-t border-border/10">
            {/* Architectural Blueprint Background */}
            <div className="absolute inset-0 -z-10 opacity-10">
                <div className="absolute inset-0 bg-grid-pattern" />
                <svg className="absolute inset-0 w-full h-full text-accent-visible/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="10" y1="0" x2="10" y2="100" stroke="currentColor" strokeWidth="0.05" />
                    <line x1="90" y1="0" x2="90" y2="100" stroke="currentColor" strokeWidth="0.05" />
                    <circle cx="10" cy="50" r="0.5" fill="currentColor" />
                    <circle cx="90" cy="50" r="0.5" fill="currentColor" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
                        {/* Status Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-10"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-accent-visible">
                                    <span className="w-8 h-[1px] bg-accent-visible" />
                                    <span className="text-xs font-black uppercase tracking-[0.4em]">Operational_HQ</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-bold font-display tracking-tightest leading-[0.85]">
                                    SECURE_A <br />
                                    <span className="text-accent-visible">CONSULT</span><span className="text-foreground/20">.</span>
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <p className="text-xl text-muted font-light leading-relaxed max-w-lg">
                                    Systems are fully operational. I am currently accepting high-priority collaborations and technical challenges for the next production cycle.
                                </p>
                                <div className="flex flex-wrap gap-4 font-mono text-[10px] text-muted uppercase tracking-widest">
                                    <div className="px-3 py-1 rounded-full border border-border/40 bg-surface-elevated/20">Availability: 98.4%</div>
                                    <div className="px-3 py-1 rounded-full border border-border/40 bg-surface-elevated/20">Response_Time: &lt; 24H</div>
                                    <div className="px-3 py-1 rounded-full border border-border/40 bg-surface-elevated/20">Region: Digital_Ether</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive Terminal / Socials */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-auto"
                        >
                            <div className="bg-surface-elevated/30 backdrop-blur-xl border border-border/40 p-10 rounded-[32px] shadow-2xl relative group">
                                <div className="absolute -top-4 -right-4 w-12 h-12 border border-accent-visible/20 rounded-full flex items-center justify-center text-accent-visible animate-spin-slow">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>

                                <div className="space-y-8 min-w-[320px]">
                                    <a href="mailto:hello@syntaxsamurai.com" className="block">
                                        <Button size="lg" className="w-full h-20 text-xl font-black uppercase tracking-[0.2em] bg-accent-visible text-white shadow-xl hover:shadow-accent-visible/20 group transition-all rounded-2xl">
                                            Initiate_Link
                                            <svg className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Button>
                                    </a>

                                    <div className="pt-8 border-t border-border/10">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted">Technical_Nodes</span>
                                            <div className="flex gap-2">
                                                <div className="w-1 h-1 rounded-full bg-accent-visible" />
                                                <div className="w-1 h-1 rounded-full bg-accent-visible opacity-50" />
                                                <div className="w-1 h-1 rounded-full bg-accent-visible opacity-20" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <SocialLink href="https://github.com/syntaxsamurai" label="GITHUB" />
                                            <SocialLink href="https://twitter.com/syntaxsamurai" label="TWITTER" />
                                            <SocialLink href="https://linkedin.com/in/syntaxsamurai" label="LINKED" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -8 }}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-surface-elevated/20 border border-border/20 hover:border-accent-visible/40 hover:bg-accent-visible/5 transition-all group"
            title={label}
        >
            <span className="text-xl group-hover:scale-110 transition-transform">
                {label === 'GITHUB' && '🐙'}
                {label === 'TWITTER' && '🐦'}
                {label === 'LINKED' && '💼'}
            </span>
            <span className="text-[9px] font-black font-display uppercase tracking-widest text-muted group-hover:text-accent-visible">{label}</span>
        </motion.a>
    );
}
