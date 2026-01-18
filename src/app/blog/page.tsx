import { prisma } from "@/lib/prisma";
import BlogList from "@/components/blog/BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Thoughts, tutorials, and insights on web development, programming, and technology.",
};

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
    });

    return <BlogList posts={posts} />;
}
