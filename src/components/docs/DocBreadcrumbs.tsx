'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocBreadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length <= 1) return null;

    return (
        <nav className="flex items-center gap-2 text-xs text-muted mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/docs" className="hover:text-accent-visible transition-colors">
                Docs
            </Link>
            {segments.slice(1).map((segment, index) => {
                const path = `/${segments.slice(0, index + 2).join('/')}`;
                const isLast = index === segments.slice(1).length - 1;

                return (
                    <div key={path} className="flex items-center gap-2">
                        <span className="opacity-30">/</span>
                        {isLast ? (
                            <span className="text-foreground font-medium capitalize">
                                {segment.replace(/-/g, ' ')}
                            </span>
                        ) : (
                            <Link href={path} className="hover:text-accent-visible transition-colors capitalize">
                                {segment.replace(/-/g, ' ')}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
