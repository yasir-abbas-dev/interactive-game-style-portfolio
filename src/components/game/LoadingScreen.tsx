import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...');
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  const statusMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING ASSETS...',
    'COMPILING SHADERS...',
    'ESTABLISHING CONNECTION...',
    'SYNCHRONIZING DATA...',
    'READY',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 15 + 5;
        const next = Math.min(prev + increment, 100);

        // Update status text based on progress
        const statusIndex = Math.min(
          Math.floor((next / 100) * statusMessages.length),
          statusMessages.length - 1
        );
        setStatusText(statusMessages[statusIndex]);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Fade out animation
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.in',
              onComplete,
            });
          }, 500);
        }

        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (glitchRef.current && Math.random() > 0.7) {
        gsap.to(glitchRef.current, {
          x: (Math.random() - 0.5) * 10,
          duration: 0.05,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            gsap.set(glitchRef.current, { x: 0 });
          },
        });
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
    >
      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none scanline opacity-50" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div ref={glitchRef} className="flex flex-col items-center gap-8 px-4">
        {/* Logo */}
        <div className="relative">
          <h1 className="font-display text-4xl md:text-6xl tracking-[0.3em] text-primary glow-text">
            LOADING
          </h1>
          <div className="absolute -inset-2 bg-primary/5 blur-xl" />
        </div>

        {/* Progress container */}
        <div className="w-80 md:w-96">
          {/* Progress bar background */}
          <div className="relative h-4 bg-muted rounded overflow-hidden hud-border">
            {/* Animated fill */}
            <div
              ref={progressBarRef}
              className="h-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, 
                  hsl(var(--primary)) 0%, 
                  hsl(var(--secondary)) 50%, 
                  hsl(var(--primary)) 100%)`,
                boxShadow: '0 0 20px hsl(var(--primary))',
              }}
            />

            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
                transform: `translateX(${progress - 100}%)`,
                transition: 'transform 0.3s',
              }}
            />
          </div>

          {/* Progress text */}
          <div className="flex justify-between mt-2">
            <span className="font-display text-sm text-muted-foreground tracking-wider">
              {statusText}
            </span>
            <span className="font-display text-sm text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading indicators */}
        <div className="flex gap-4 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              style={{
                animation: `pulse 1s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* System info */}
        <div className="mt-8 text-xs text-muted-foreground font-display tracking-widest space-y-1 text-center">
          <p>SYSTEM VERSION 1.0.0</p>
          <p className="text-primary/60">PORTFOLIO INTERFACE</p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
