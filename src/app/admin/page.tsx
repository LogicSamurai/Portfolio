import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    // Fetch stats
    const [blogCount, docCount, projectCount] = await Promise.all([
        prisma.blogPost.count(),
        prisma.doc.count(),
        prisma.project.count(),
    ]);

    return (
        <AdminDashboard
            user={session.user}
            stats={{
                blogs: blogCount,
                docs: docCount,
                projects: projectCount,
            }}
        />
    );
}
