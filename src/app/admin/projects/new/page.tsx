import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        redirect("/login");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-display mb-2">New Project</h1>
                <p className="text-muted">Showcase your latest work to the world.</p>
            </div>

            <ProjectForm />
        </div>
    );
}
