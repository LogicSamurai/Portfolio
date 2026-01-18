import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const session = await auth();
    const { id } = await params;

    if (!session || session.user.role !== 'admin') {
        redirect("/login");
    }

    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-display mb-2">Edit Project</h1>
                <p className="text-muted">Update your project case study and details.</p>
            </div>

            <ProjectForm initialData={project} isEditing={true} />
        </div>
    );
}
