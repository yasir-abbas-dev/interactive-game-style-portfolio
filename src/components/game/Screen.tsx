import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface ScreenProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}

export function Screen({ children, isActive, className }: ScreenProps) {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!screenRef.current) return;

    if (isActive) {
      gsap.fromTo(
        screenRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(screenRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={screenRef}
      className={cn(
        'fixed inset-0 flex flex-col items-center justify-center scanline grid-bg',
        className
      )}
    >
      {children}
    </div>
  );
}
