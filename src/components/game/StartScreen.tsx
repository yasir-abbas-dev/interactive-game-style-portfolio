import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Screen } from './Screen';
import { TypewriterText } from './TypewriterText';

interface StartScreenProps {
  isActive: boolean;
  onStart: () => void;
}

export function StartScreen({
  isActive,
  onStart
}: StartScreenProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const tl = gsap.timeline({
      delay: 0.3
    });
    tl.fromTo(titleRef.current, {
      y: -50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }).fromTo(subtitleRef.current, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3').fromTo(buttonRef.current, {
      scale: 0.8,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out'
    }, '-=0.2');
  }, [isActive]);

  return <Screen isActive={isActive}>
      <div className="flex flex-col items-center gap-4 md:gap-8 px-4">
        <h1 ref={titleRef} className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider glow-text text-primary text-center">
          <TypewriterText text="M.YASIR ABBAS" speed={80} isActive={isActive} />
        </h1>
        
        <div ref={subtitleRef} className="font-display text-sm sm:text-base md:text-xl tracking-[0.2em] md:tracking-[0.5em] text-muted-foreground uppercase text-center">
          <TypewriterText 
            text="Frontend Developer | UI & Animation Enthusiast" 
            speed={30} 
            delay={1200} 
            isActive={isActive} 
          />
        </div>
        
        <p className="text-xs md:text-sm text-muted-foreground/70 max-w-md text-center italic px-4">
          <TypewriterText 
            text='"I don&apos;t just build websites — I design digital experiences."' 
            speed={25} 
            delay={2500} 
            isActive={isActive} 
          />
        </p>

        <button ref={buttonRef} onClick={onStart} className="mt-8 md:mt-12 font-display text-xl md:text-3xl tracking-widest text-primary pulse-glow cursor-pointer hover:scale-110 transition-transform duration-300">
          [ PRESS START ]
        </button>

        <p className="mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground tracking-wider">
          Press <span className="text-primary font-display">ENTER</span> or click to continue
        </p>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-primary rounded-full opacity-30" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }} />)}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
      `}</style>
    </Screen>;
}