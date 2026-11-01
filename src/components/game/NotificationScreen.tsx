import { useEffect } from 'react';
import { Screen } from './Screen';
import { TypewriterText } from './TypewriterText';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface NotificationScreenProps {
    isActive: boolean;
    onContinue: () => void;
}

export function NotificationScreen({ isActive, onContinue }: NotificationScreenProps) {
    useEffect(() => {
        if (!isActive) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                onContinue();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, onContinue]);

    return (
        <Screen isActive={isActive}>
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className={`
          relative max-w-lg w-full bg-card/90 border border-primary/30 backdrop-blur-md p-8 
          flex flex-col gap-6 shadow-2xl overflow-hidden
          ${isActive ? 'animate-in fade-in zoom-in-95 duration-500' : 'opacity-0'}
        `}>
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary" />

                    {/* Header */}
                    <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <ShieldCheck className="w-6 h-6 text-primary animate-pulse" />
                        </div>
                        <h2 className="font-display text-xl tracking-widest text-primary glow-text">
                            SYSTEM INITIALIZED
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <p className="font-display text-sm tracking-widest text-muted-foreground uppercase">
                            <TypewriterText
                                text="Welcome, User."
                                speed={50}
                                isActive={isActive}
                            />
                        </p>
                        <p className="text-sm text-foreground/80 leading-relaxed font-mono border-l-2 border-primary/30 pl-4 py-1">
                            <TypewriterText
                                text="Neural interface connected. Portfolio database loaded successfully. Access granted to all public archives."
                                speed={20}
                                delay={800}
                                isActive={isActive}
                            />
                        </p>

                        {/* Instructions */}
                        <div className={`space-y-2 pt-2 border-t border-primary/20 transition-opacity duration-500 delay-[2000ms] ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                            <h3 className="text-xs font-display text-primary tracking-wider uppercase mb-2">[ OPERATIONAL GUIDE ]</h3>
                            <ul className="text-xs text-muted-foreground font-mono space-y-1.5 list-none">
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                                    <span>Navigate via <strong className="text-foreground">MOUSE</strong> or <strong className="text-foreground">KEYBOARD</strong></span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                                    <span><strong className="text-foreground">ESC</strong> to return / <strong className="text-foreground">ENTER</strong> to confirm</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                                    <span>Access <strong className="text-foreground">MISSIONS</strong> for project logs</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 flex justify-end">
                        <button
                            onClick={onContinue}
                            className="group flex items-center gap-2 px-6 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/50 rounded transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <span className="font-display text-xs tracking-widest text-primary">INITIALIZE</span>
                            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Scanline overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%] opacity-20" />
                </div>
            </div>
        </Screen>
    );
}
