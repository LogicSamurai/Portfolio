import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogForm from "@/components/admin/BlogForm";

interface EditBlogPostPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
    const session = await auth();
    const { id } = await params;

    if (!session) {
        redirect("/login");
    }

    const post = await prisma.blogPost.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    const initialData = {
        ...post,
        tags: post.tags.join(', '),
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold font-display">Edit Post</h1>
                <p className="text-muted mt-2">Update your content</p>
            </div>

            <BlogForm initialData={initialData} isEditing />
        </div>
    );
}
