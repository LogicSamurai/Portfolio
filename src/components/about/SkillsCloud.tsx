'use client';

import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: 'Core Architecture',
        desc: 'Server-side systems & high-availability logic.',
        skills: [
            { name: 'Node.js', level: 95, status: 'MASTERED' },
            { name: 'PostgreSQL', level: 90, status: 'ADVANCED' },
            { name: 'Redis', level: 85, status: 'TUNED' },
            { name: 'GraphQL', level: 80, status: 'FLUENT' },
        ],
        size: 'bento-col-2 bento-row-2'
    },
    {
        title: 'Frontend Narrative',
        desc: 'Immersive storytelling through motion & pixels.',
        skills: [
            { name: 'Next.js', level: 98, status: 'NATIVE' },
            { name: 'TypeScript', level: 95, status: 'STRICT' },
            { name: 'Three.js', level: 75, status: 'EXP' },
        ],
        size: 'bento-col-2 bento-row-1'
    },
    {
        title: 'Deployment & Ops',
        desc: 'Automated CI/CD pipelines & cloud scale.',
        skills: [
            { name: 'Docker', level: 85, status: 'ACTIVE' },
            { name: 'AWS', level: 80, status: 'PROVISIONED' },
        ],
        size: 'bento-col-1 bento-row-1'
    },
    {
        title: 'Design Philosophy',
        desc: 'Advanced UX & Neo-Noir aesthetics.',
        skills: [
            { name: 'Figma', level: 90, status: 'EXPERT' },
            { name: 'Motion', level: 95, status: 'FLUID' },
        ],
        size: 'bento-col-1 bento-row-1'
    }
];

export default function SkillsCloud() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 space-y-4"
                    >
                        <div className="flex items-center gap-4 text-accent-visible">
                            <span className="w-8 h-[1px] bg-accent-visible" />
                            <span className="text-xs font-black uppercase tracking-widest">Diagnostic Report</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tightest">
                            TECHNICAL <span className="text-accent-visible">ARSENAL</span>
                        </h2>
                    </motion.div>

                    <div className="bento-grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bento-item p-8 group flex flex-col justify-between ${category.size}`}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-xl font-bold font-display text-foreground group-hover:text-accent-visible transition-colors">
                                            {category.title}
                                        </h3>
                                        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Sector {idx + 1}</span>
                                    </div>
                                    <p className="text-sm text-muted mb-10 leading-relaxed font-light">
                                        {category.desc}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {category.skills.map((skill) => (
                                        <div key={skill.name} className="space-y-2">
                                            <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-foreground">{skill.name}</span>
                                                <span className="text-accent-visible">{skill.status}</span>
                                            </div>
                                            <div className="h-[2px] w-full bg-border/20 relative overflow-hidden">
                                                <motion.div
                                                    className="absolute inset-y-0 left-0 bg-accent-visible"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
