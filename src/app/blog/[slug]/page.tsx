import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPost from "@/components/blog/BlogPost";
import { Metadata } from "next";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.description || undefined,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (!post || !post.published) {
        notFound();
    }

    // Increment view count
    await prisma.blogPost.update({
        where: { id: post.id },
        data: {
            views: {
                increment: 1,
            },
        },
    });

    return <BlogPost post={post} />;
}
