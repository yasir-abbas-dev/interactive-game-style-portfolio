import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Terminal, MousePointer, Keyboard, X, Info } from 'lucide-react';

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3,
            });
            gsap.to(panelRef.current, {
                x: '0%',
                duration: 0.5,
                ease: 'power3.out',
            });
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3,
            });
            gsap.to(panelRef.current, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in',
            });
        }
    }, [isOpen]);

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 opacity-0 pointer-events-none"
                onClick={onClose}
            />

            {/* Slide-out Panel */}
            <div
                ref={panelRef}
                className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-card border-l border-primary/30 z-[60] transform translate-x-full shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary/20 bg-muted/30">
                    <div className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-primary" />
                        <h2 className="font-display text-xl tracking-widest text-primary glow-text">
                            SYSTEM PROTOCOLS
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 relative">
                    {/* Decorative grid bg */}
                    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

                    {/* Section 1: Navigation */}
                    <div className="relative space-y-3">
                        <div className="flex items-center gap-3 text-secondary font-display tracking-wider border-b border-secondary/20 pb-2">
                            <Terminal className="w-4 h-4" />
                            <h3 className="text-base">[01] NAVIGATION</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed pl-4 border-l border-secondary/20">
                            Initialize via <span className="text-secondary font-bold">[ PRESS START ]</span>.
                            Access subsystems (MISSIONS, SKILLS) through the central command menu.
                        </p>
                    </div>

                    {/* Section 2: Interaction */}
                    <div className="relative space-y-3">
                        <div className="flex items-center gap-3 text-accent font-display tracking-wider border-b border-accent/20 pb-2">
                            <MousePointer className="w-4 h-4" />
                            <h3 className="text-base">[02] INTERACTION</h3>
                        </div>
                        <div className="grid gap-3 pl-4 border-l border-accent/20 text-sm">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                    <span className="text-foreground font-bold text-xs uppercase">Click</span>
                                </div>
                                <span className="text-muted-foreground pl-3.5">Execute commands & open links</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                    <span className="text-foreground font-bold text-xs uppercase">Hover</span>
                                </div>
                                <span className="text-muted-foreground pl-3.5">Reveal detailed intelligence</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                    <span className="text-foreground font-bold text-xs uppercase">Long Press</span>
                                </div>
                                <span className="text-muted-foreground pl-3.5">Expand Mission Cards</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Shortcuts */}
                    <div className="relative space-y-3">
                        <div className="flex items-center gap-3 text-primary font-display tracking-wider border-b border-primary/20 pb-2">
                            <Keyboard className="w-4 h-4" />
                            <h3 className="text-base">[03] SHORTCUTS</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col bg-muted/30 p-3 rounded border border-white/5">
                                <span className="font-mono text-primary text-xs mb-1">ESC</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Return to Base</span>
                            </div>
                            <div className="flex flex-col bg-muted/30 p-3 rounded border border-white/5">
                                <span className="font-mono text-primary text-xs mb-1">ENTER</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Confirm</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-primary/20 bg-muted/30">
                    <p className="text-[10px] text-muted-foreground text-center font-display tracking-widest">
                        SYSTEM VERSION 1.0.0 // READY
                    </p>
                </div>
            </div>
        </>
    );
}
