import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Badge from "@/components/ui/Badge";
import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug },
    });

    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Projects`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
        where: { slug },
    });

    if (!project || !project.published) {
        notFound();
    }

    const { content } = await compileMDX({
        source: project.content || project.description,
        options: { parseFrontmatter: true },
    });

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    <Link
                        href="/projects"
                        className="text-accent text-xs font-bold uppercase tracking-widest mb-8 inline-flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Projects
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tightest mb-6">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {project.technologies.map((tech: string) => (
                            <Badge key={tech} variant="outline" className="border-accent/30 text-accent bg-accent/5">
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-white/5">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Category</span>
                            <p className="text-lg font-medium">{project.category}</p>
                        </div>
                        <div className="flex gap-4 items-center md:justify-end">
                            {project.githubUrl && (
                                <Link href={project.githubUrl} target="_blank">
                                    <Button variant="secondary" size="sm">GitHub</Button>
                                </Link>
                            )}
                            {project.liveUrl && (
                                <Link href={project.liveUrl} target="_blank">
                                    <Button size="sm">Live Demo</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                {project.imageUrl && (
                    <div className="max-w-6xl mx-auto mb-16 aspect-video relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <article className="max-w-4xl mx-auto prose prose-invert prose-emerald lg:prose-xl">
                    <div className="mdx-content">
                        {content}
                    </div>
                </article>
            </div>
        </main>
    );
}
