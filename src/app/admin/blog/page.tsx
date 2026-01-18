import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminBlogList from "@/components/admin/AdminBlogList";

export default async function AdminBlogPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const posts = await prisma.blogPost.findMany({
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

    return (
        <div className="container mx-auto px-4 py-12">
            <AdminBlogList posts={posts} />
        </div>
    );
}
