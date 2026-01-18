import AboutTimeline from '@/components/about/AboutTimeline';
import SkillsCloud from '@/components/about/SkillsCloud';
import ContactSection from '@/components/home/ContactSection';
import { motion } from 'framer-motion';

export const metadata = {
    title: 'About | SyntaxSamurai',
    description: 'The journey, skills, and philosophy of SyntaxSamurai.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-20">
            {/* Header / Intro */}
            <section className="py-24 border-b border-border/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 text-accent-visible mb-6">
                            <span className="w-8 h-[1px] bg-accent-visible" />
                            <span className="text-xs font-black uppercase tracking-widest">Profile Identity</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black font-display mb-12 tracking-tightest leading-[0.8]">
                            THE <span className="text-accent-visible">ARCHITECT</span><span className="text-foreground/20">.</span>
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <p className="text-2xl font-light leading-relaxed text-foreground/90 mb-6">
                                    I am SyntaxSamurai, a specialized software engineer dedicated to crafting high-performance digital experiences with absolute technical precision.
                                </p>
                            </div>
                            <div>
                                <p className="text-lg text-muted leading-relaxed">
                                    My philosophy is simple: **Speed, Stability, and Style.** I believe code is more than logic—it's a form of structural art. I build systems that don't just work; they thrive under pressure and look stunning while doing it.
                                </p>
                                <p className="text-lg text-muted mt-6 leading-relaxed">
                                    Based in the digital ether, I focus on the intersection of advanced backend logic and immersive frontend storytelling.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AboutTimeline />
            <SkillsCloud />
            <ContactSection />
        </main>
    );
}
