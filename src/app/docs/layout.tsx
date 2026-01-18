import { prisma } from "@/lib/prisma";
import DocSidebar from "@/components/docs/DocSidebar";

async function getDocStructure() {
    const folders = await prisma.docFolder.findMany({
        orderBy: {
            order: 'asc',
        },
        include: {
            docs: {
                where: {
                    published: true,
                },
                orderBy: {
                    order: 'asc',
                },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    order: true,
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

    return structure.sort((a, b) => a.order - b.order);
}

export default async function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const structure = await getDocStructure();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                        <div className="mb-6 px-3">
                            <h2 className="text-xl font-bold font-display uppercase tracking-wider">Docs</h2>
                            <div className="h-1 w-8 bg-accent mt-1" />
                        </div>
                        <DocSidebar structure={structure} />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
