import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DocFolderForm from "@/components/admin/DocFolderForm";

export default async function NewDocFolderPage() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        redirect("/login");
    }

    const folders = await prisma.docFolder.findMany({
        orderBy: {
            name: 'asc',
        },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-display mb-2">Create Folder</h1>
                <p className="text-muted">Organize your documentation with hierarchical folders.</p>
            </div>

            <DocFolderForm folders={folders} />
        </div>
    );
}
