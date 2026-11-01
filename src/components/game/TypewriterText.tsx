import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  isActive?: boolean;
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className,
  onComplete,
  isActive = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      hasStartedRef.current = false;
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    setIsTyping(true);
    let currentIndex = 0;

    const startTyping = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [text, speed, delay, isActive, onComplete]);

  return (
    <span className={cn(className)}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse" />
      )}
    </span>
  );
}
