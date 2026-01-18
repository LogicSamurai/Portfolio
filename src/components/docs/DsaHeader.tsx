'use client';

import Badge from '@/components/ui/Badge';

interface DsaHeaderProps {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeComplexity: string;
    spaceComplexity: string;
}

export default function DsaHeader({ title, difficulty, timeComplexity, spaceComplexity }: DsaHeaderProps) {
    const difficultyColors: Record<string, string> = {
        Easy: 'var(--difficulty-easy)',
        Medium: 'var(--difficulty-medium)',
        Hard: 'var(--difficulty-hard)',
    };

    return (
        <div className="not-prose mb-12 p-8 rounded-3xl bg-surface-elevated border border-border/40 relative overflow-hidden group transition-all shadow-sm hover:shadow-md">
            {/* Ambient Background Glow */}
            <div
                className="absolute -right-12 -top-12 w-48 h-48 blur-[100px] opacity-10 dark:opacity-20 group-hover:opacity-15 dark:group-hover:opacity-30 transition-opacity duration-700"
                style={{ backgroundColor: difficultyColors[difficulty] }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 tracking-tightest text-foreground">
                        {title}
                    </h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        <div
                            className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border border-white/20 shadow-xl relative overflow-hidden"
                            style={{
                                color: 'black',
                                backgroundColor: difficultyColors[difficulty],
                                boxShadow: `0 0 20px ${difficultyColors[difficulty]}55`
                            }}
                        >
                            <span className="relative z-10">{difficulty}</span>
                            <div className="absolute inset-0 bg-white/20 dark:bg-black/10 animate-pulse" />
                        </div>

                        <div className="h-6 w-px bg-border/50 hidden md:block" />

                        <div className="flex flex-wrap gap-3">
                            <Badge variant="outline" className="border-complexity-time/30 text-complexity-time bg-complexity-time/5 dark:bg-complexity-time/10 font-mono text-[11px] px-3 font-bold border">
                                <span className="mr-1.5 opacity-60">TIME</span> {timeComplexity}
                            </Badge>
                            <Badge variant="outline" className="border-complexity-space/30 text-complexity-space bg-complexity-space/5 dark:bg-complexity-space/10 font-mono text-[11px] px-3 font-bold border">
                                <span className="mr-1.5 opacity-60">SPACE</span> {spaceComplexity}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
