import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import AdminDocList from "@/components/admin/AdminDocList";

export default async function AdminDocsPage() {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        redirect("/login");
    }

    // Fetch hierarchical structure
    // (Similar logic to public API but including draft docs)
    const folders = await prisma.docFolder.findMany({
        orderBy: {
            order: 'asc',
        },
        include: {
            docs: {
                orderBy: {
                    order: 'asc',
                },
            },
        },
    });

    const folderMap = new Map<string, any>();
    folders.forEach((f: any) => {
        folderMap.set(f.id, {
            ...f,
            children: [],
        });
    });

    const structure: any[] = [];
    folderMap.forEach((f: any) => {
        if (f.parentId) {
            const parent = folderMap.get(f.parentId);
            if (parent) {
                parent.children.push(f);
            } else {
                structure.push(f);
            }
        } else {
            structure.push(f);
        }
    });

    structure.sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-display mb-2">Documentation</h1>
                    <p className="text-muted">Manage your technical manual and hierarchical content.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/docs/folder/new">
                        <Button variant="outline">New Folder</Button>
                    </Link>
                    <Link href="/admin/docs/new">
                        <Button variant="primary">New Doc</Button>
                    </Link>
                </div>
            </div>

            <AdminDocList structure={structure} />
        </div>
    );
}
