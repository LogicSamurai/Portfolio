'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes, HighlightProps } from 'prism-react-renderer';

interface CodeTabsProps {
    tabs: {
        label: string;
        language: string;
        code: string;
    }[];
}

const neoNoirPrismTheme = {
    ...themes.vsDark,
    plain: {
        color: "#ffffff",
        backgroundColor: "#000000",
    },
    styles: [
        ...themes.vsDark.styles,
        {
            types: ["keyword", "storage", "variable.language"],
            style: { color: "#d4ff00" }
        },
        {
            types: ["comment"],
            style: { color: "#555555", fontStyle: "italic" as const }
        },
        {
            types: ["string", "char", "attr-value"],
            style: { color: "#ffffff" }
        },
        {
            types: ["function", "class-name"],
            style: { color: "#ffffff", fontWeight: "bold" as const }
        },
        {
            types: ["constant", "number", "boolean"],
            style: { color: "#d4ff00", fontWeight: "bold" as const }
        },
        {
            types: ["tag", "operator"],
            style: { color: "#d4ff00" }
        }
    ]
};

export default function CodeTabs({ tabs }: CodeTabsProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(tabs[activeTab].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="not-prose my-12 border border-border/30 rounded-3xl overflow-hidden bg-[#0a0a0a] shadow-2xl group">
            {/* Tab Headers */}
            <div className="flex items-center justify-between border-b border-border/20 bg-surface/40 px-4">
                <div className="flex">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(index)}
                            className={`relative px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === index
                                ? 'text-accent'
                                : 'text-muted hover:text-foreground'
                                }`}
                        >
                            {tab.label}
                            {activeTab === index && (
                                <motion.div
                                    layoutId="activeTabDoc"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Terminal Dots (Decorative) */}
                <div className="flex gap-1.5 mr-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/50" />
                </div>
            </div>

            {/* Tab Content */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="p-0"
                    >
                        <Highlight
                            theme={neoNoirPrismTheme}
                            code={tabs[activeTab].code}
                            language={tabs[activeTab].language}
                        >
                            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre className={`${className} p-8 overflow-x-auto text-sm font-mono !bg-transparent`}>
                                    {tokens.map((line, i) => (
                                        <div key={i} {...getLineProps({ line })}>
                                            <span className="inline-block w-8 mr-4 text-xs text-muted/20 select-none text-right">
                                                {i + 1}
                                            </span>
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </div>
                                    ))}
                                </pre>
                            )}
                        </Highlight>
                    </motion.div>
                </AnimatePresence>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/40 text-white/40 hover:text-accent transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 flex items-center gap-2"
                    title="Copy code"
                >
                    {copied ? (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Copied!</span>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
