'use client';

import { useState, useEffect, useRef } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder, className = '' }: MarkdownEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const preRef = useRef<HTMLPreElement>(null);

    // Sync scroll between textarea and highlighted code
    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        if (preRef.current) {
            preRef.current.scrollTop = e.currentTarget.scrollTop;
            preRef.current.scrollLeft = e.currentTarget.scrollLeft;
        }
    };

    return (
        <div className={`relative font-mono text-sm leading-relaxed border border-border/10 bg-surface/5 overflow-hidden group ${className}`}>
            {/* Syntax Highlighted Overlay */}
            <Highlight
                theme={themes.vsDark}
                code={value}
                language="markdown"
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        ref={preRef}
                        className={`${className} p-6 h-full w-full overflow-hidden pointer-events-none absolute inset-0 whitespace-pre-wrap break-words`}
                        style={{ ...style, backgroundColor: 'transparent' }}
                    >
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                                {line.length === 0 && '\n'}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>

            {/* Transparent Textarea for Input */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onScroll={handleScroll}
                placeholder={placeholder}
                spellCheck={false}
                className="relative w-full h-full p-6 bg-transparent text-transparent caret-accent-visible border-none focus:ring-0 resize-none font-inherit leading-inherit whitespace-pre-wrap break-words"
            />

            {/* Decoration: Line Numbers or Markers */}
            <div className="absolute left-0 top-0 w-1 bg-accent-visible/10 h-full group-focus-within:bg-accent-visible transition-colors" />
        </div>
    );
}
