import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Button from "@/components/ui/Button";
import Link from "next/link";
import AdminProjectList from "@/components/admin/AdminProjectList";

export default async function AdminProjectsPage() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        redirect("/login");
    }

    const projects = await prisma.project.findMany({
        orderBy: {
            order: 'asc',
        },
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold font-display mb-2">Projects</h1>
                    <p className="text-muted">Manage your portfolio and case studies.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button>Add Project</Button>
                </Link>
            </div>

            <AdminProjectList initialProjects={projects} />
        </div>
    );
}
