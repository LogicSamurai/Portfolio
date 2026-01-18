import { prisma } from "@/lib/prisma";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Syntax Samurai",
    description: "Explore my latest work, including web applications, open source, and technical case studies.",
};

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        where: {
            published: true,
        },
        orderBy: {
            order: 'asc',
        },
    });

    return (
        <main className="min-h-screen pt-32 pb-24 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                <div className="flex items-center justify-center gap-4 text-accent-visible mb-6">
                    <span className="w-8 h-[1px] bg-accent-visible" />
                    <span className="text-xs font-black uppercase tracking-widest">Experimental Labs</span>
                    <span className="w-8 h-[1px] bg-accent-visible" />
                </div>
                <h1 className="text-7xl md:text-9xl font-bold font-display tracking-tightest leading-[0.8]">
                    SELECTED <span className="text-accent-visible">WORK</span>
                </h1>
                <p className="text-xl text-muted font-light leading-relaxed pt-8 max-w-2xl mx-auto">
                    A collection of technical solutions, experimental labs, and full-stack applications.
                </p>
            </div>

            <ProjectGrid projects={projects} />
        </main>
    );
}
