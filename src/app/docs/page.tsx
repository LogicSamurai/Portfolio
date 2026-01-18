import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function DocsPage() {
    return (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <header className="space-y-6 relative">
                <div className="flex items-center gap-4 text-accent-visible">
                    <span className="w-8 h-[1px] bg-accent-visible" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">SPEC_ARCHIVE_0.1</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold font-display leading-[0.8] tracking-tightest">
                    TECHNICAL <br />
                    <span className="text-accent-visible">MANUAL</span><span className="text-foreground/20">.</span>
                </h1>
                <p className="text-xl text-muted max-w-2xl leading-relaxed font-light">
                    A high-fidelity record of development protocols, architectural patterns, and systemic explorations into computational efficiency.
                </p>
                <div className="absolute -right-12 top-0 opacity-5 hidden lg:block">
                    <span className="text-[200px] font-black font-display rotate-90 inline-block pointer-events-none select-none">DOCS</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/docs/dsa" className="group">
                    <div className="p-10 rounded-[32px] bg-surface-elevated/40 backdrop-blur-xl border border-border/20 group-hover:border-accent-visible/40 transition-all duration-700 relative overflow-hidden h-full">
                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🧩</div>
                        <h3 className="text-3xl font-bold font-display mb-4 tracking-tightest">DSA_HANDBOOK</h3>
                        <p className="text-muted font-light leading-relaxed">
                            Systematic decomposition of algorithms and data structures through architectural visualization and symbolic logic.
                        </p>
                        <div className="mt-8 pt-6 border-t border-border/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent-visible">Analyze_Logic</span>
                        </div>
                    </div>
                </Link>

                <Link href="/docs/best-practices" className="group">
                    <div className="p-10 rounded-[32px] bg-surface-elevated/40 backdrop-blur-xl border border-border/20 group-hover:border-accent-visible/40 transition-all duration-700 relative overflow-hidden h-full">
                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🛠️</div>
                        <h3 className="text-3xl font-bold font-display mb-4 tracking-tightest">PROTOCOLS</h3>
                        <p className="text-muted font-light leading-relaxed">
                            A living repository of current production standards, clean architecture principles, and systemic optimization workflows.
                        </p>
                        <div className="mt-8 pt-6 border-t border-border/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent-visible">View_Manual</span>
                        </div>
                    </div>
                </Link>
            </div>

            <section className="bg-accent-visible/5 rounded-[32px] p-12 border border-accent-visible/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                    <div className="space-y-4 text-center md:text-left">
                        <h4 className="text-3xl font-bold font-display tracking-tightest uppercase">Protocol_Contribution</h4>
                        <p className="text-muted font-light max-w-md">Discovered a systemic inefficiency or have an architectural improvement? Initiate a technical request below.</p>
                    </div>
                    <Button variant="primary" className="h-16 px-10 bg-accent-visible text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-accent-visible/20 transition-all">
                        Sync_Request
                    </Button>
                </div>
            </section>
        </div>
    );
}
