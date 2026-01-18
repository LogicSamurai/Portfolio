'use client';

import { useEffect, useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface TechnicalPreviewProps {
    content: string;
}

export default function TechnicalPreview({ content }: TechnicalPreviewProps) {
    const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

    useEffect(() => {
        async function prepareMDX() {
            try {
                const mdx = await serialize(content, {
                    mdxOptions: {
                        development: false,
                    },
                });
                setMdxSource(mdx);
            } catch (err) {
                console.error('MDX Serialization Error:', err);
            }
        }

        const timeout = setTimeout(prepareMDX, 300); // Debounce preview
        return () => clearTimeout(timeout);
    }, [content]);

    const components = {
        h1: (props: any) => <h1 className="text-3xl font-bold font-display mt-8 mb-4 tracking-tightest uppercase" {...props} />,
        h2: (props: any) => <h2 className="text-2xl font-bold font-display mt-8 mb-4 tracking-tightest uppercase" {...props} />,
        h3: (props: any) => <h3 className="text-xl font-bold font-display mt-6 mb-3 tracking-tightest uppercase" {...props} />,
        p: (props: any) => <p className="text-sm text-foreground/80 leading-relaxed mb-4 font-light" {...props} />,
        ul: (props: any) => <ul className="list-disc list-outside ml-4 mb-4 space-y-2 text-sm text-foreground/70" {...props} />,
        ol: (props: any) => <ol className="list-decimal list-outside ml-4 mb-4 space-y-2 text-sm text-foreground/70" {...props} />,
        li: (props: any) => <li className="pl-1" {...props} />,
        code: (props: any) => {
            if (props.className) {
                return (
                    <div className="relative my-6 px-4 py-3 bg-surface-elevated/20 border border-border/10 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre">
                        <code {...props} />
                    </div>
                );
            }
            return <code className="bg-accent-visible/10 px-1.5 py-0.5 rounded text-xs font-mono text-accent-visible" {...props} />;
        },
    };

    return (
        <div className="h-full overflow-y-auto p-8 border border-border/10 bg-surface/5 relative group">
            <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted opacity-40 select-none">
                PREVIEW_MODE_[[STABLE]]
            </div>

            <div className="prose prose-invert max-w-none">
                {mdxSource ? (
                    <MDXRemote {...mdxSource} components={components} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-20">
                        <span className="text-[10px] font-mono animate-pulse">SYNCHRONIZING_CORE...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
