import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";

export default async function NewBlogPostPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold font-display">Create New Post</h1>
                <p className="text-muted mt-2">Share your thoughts with the world</p>
            </div>

            <BlogForm />
        </div>
    );
}
