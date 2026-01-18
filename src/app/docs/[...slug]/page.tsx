import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Badge from "@/components/ui/Badge";
import { Metadata } from "next";
import DocBreadcrumbs from "@/components/docs/DocBreadcrumbs";
import DsaHeader from "@/components/docs/DsaHeader";
import CodeTabs from "@/components/docs/CodeTabs";
import ComplexitySection from "@/components/docs/ComplexitySection";
import rehypePrettyCode from "rehype-pretty-code";
import { neoNoirTheme } from "@/lib/shiki-theme";

/** @type {import('rehype-pretty-code').Options} */
const options = {
    theme: neoNoirTheme as any,
    keepBackground: true,
};

interface DocPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

// Function to find the doc by matching the slug hierarchy
async function getDocBySlugPath(slugArray: string[]) {
    if (slugArray.length === 0) return null;

    const docSlug = slugArray[slugArray.length - 1];
    const folderSlugs = slugArray.slice(0, -1);

    // Find documents with this slug
    const docs = await prisma.doc.findMany({
        where: {
            slug: docSlug,
            published: true,
        },
        include: {
            folder: true,
            author: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (docs.length === 0) return null;

    // Verify folder hierarchy matches
    for (const doc of docs) {
        let currentFolder: any = doc.folder;
        let isMatch = true;

        // Match segments in reverse order
        for (let i = folderSlugs.length - 1; i >= 0; i--) {
            if (!currentFolder || currentFolder.slug !== folderSlugs[i]) {
                isMatch = false;
                break;
            }

            if (i > 0) {
                // Peek parent
                if (!currentFolder.parentId) {
                    isMatch = false;
                    break;
                }
                currentFolder = await prisma.docFolder.findUnique({
                    where: { id: currentFolder.parentId },
                });
            }
        }

        if (isMatch && folderSlugs.length > 0) {
            const rootFolder = await prisma.docFolder.findUnique({ where: { id: currentFolder.id } });
            if (rootFolder?.parentId) isMatch = false;
        }

        if (isMatch) return doc;
    }

    return null;
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
    const { slug } = await params;
    const doc = await getDocBySlugPath(slug);
    if (!doc) return { title: "Not Found" };

    return {
        title: `${doc.title} | Docs`,
        description: doc.description,
    };
}

const Pre = ({ children, ...props }: any) => (
    <div className="relative group/code">
        {/* Terminal Window Decoration */}
        <div className="absolute top-4 left-6 flex gap-1.5 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <pre {...props} className={`${props.className} pt-12`}>
            {children}
        </pre>
    </div>
);

export default async function DocPage({ params }: DocPageProps) {
    const { slug } = await params;
    const doc = await getDocBySlugPath(slug);

    if (!doc) {
        notFound();
    }

    const { content } = await compileMDX({
        source: doc.content,
        components: {
            DsaHeader,
            CodeTabs,
            ComplexitySection,
            Badge,
            pre: Pre,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, options]],
            },
        },
    });

    return (
        <article className="prose prose-invert prose-emerald max-w-none">
            <DocBreadcrumbs />
            <header className="mb-8 not-prose">
                <div className="flex flex-wrap gap-2 mb-4">
                    {doc.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" size="sm">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                    {doc.title}
                </h1>
                {doc.description && (
                    <p className="text-xl text-muted font-light leading-relaxed mb-6">
                        {doc.description}
                    </p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted border-b border-border pb-6">
                    <span className="flex items-center gap-2">
                        <span className="opacity-70">Author:</span>
                        <span className="text-foreground font-medium">{doc.author.name}</span>
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>Updated {new Date(doc.updatedAt).toLocaleDateString()}</span>
                </div>
            </header>

            <div className="mdx-content">
                {content}
            </div>
        </article>
    );
}
