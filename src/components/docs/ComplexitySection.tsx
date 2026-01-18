'use client';

interface ComplexitySectionProps {
    time: string;
    timeExplanation: string;
    space: string;
    spaceExplanation: string;
}

export default function ComplexitySection({ time, timeExplanation, space, spaceExplanation }: ComplexitySectionProps) {
    return (
        <div className="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-elevated border border-border/40 rounded-3xl p-8 relative overflow-hidden group transition-all hover:border-complexity-time/30 shadow-sm hover:shadow-md">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-complexity-time/20 group-hover:bg-complexity-time/40 transition-colors" />
                <h3 className="text- complexity-time text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="text-xl bg-complexity-time/10 w-10 h-10 rounded-xl flex items-center justify-center">⏱</span>
                    Time Complexity
                </h3>
                <div className="text-3xl font-mono font-bold mb-4 text-foreground tracking-tight">{time}</div>
                <p className="text-muted text-sm leading-relaxed font-light">
                    {timeExplanation}
                </p>
            </div>

            <div className="bg-surface-elevated border border-border/40 rounded-3xl p-8 relative overflow-hidden group transition-all hover:border-complexity-space/30 shadow-sm hover:shadow-md">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-complexity-space/20 group-hover:bg-complexity-space/40 transition-colors" />
                <h3 className="text-complexity-space text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="text-xl bg-complexity-space/10 w-10 h-10 rounded-xl flex items-center justify-center">💾</span>
                    Space Complexity
                </h3>
                <div className="text-3xl font-mono font-bold mb-4 text-foreground tracking-tight">{space}</div>
                <p className="text-muted text-sm leading-relaxed font-light">
                    {spaceExplanation}
                </p>
            </div>
        </div>
    );
}
