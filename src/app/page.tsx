import Hero from '@/components/home/Hero';
import SkillsCloud from '@/components/about/SkillsCloud';
import ContactSection from '@/components/home/ContactSection';
import ProjectCard from '@/components/projects/ProjectCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default async function Home() {
  const featuredProjects = await prisma.project.findMany({
    where: { published: true, featured: true },
    take: 3,
    orderBy: { order: 'asc' }
  });

  return (
    <main>
      <Hero />

      {/* Featured Projects Highlight */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-accent-visible">
                  <span className="w-8 h-[1px] bg-accent-visible" />
                  <span className="text-xs font-black uppercase tracking-widest">Selected Works</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold font-display tracking-tightest">PROTOTYPES</h2>
              </div>
              <Link href="/projects" className="group">
                <span className="text-sm font-bold uppercase tracking-widest border-b border-border/40 pb-1 group-hover:border-accent-visible transition-all">View All Labs</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SkillsCloud />
      <ContactSection />
    </main>
  );
}
