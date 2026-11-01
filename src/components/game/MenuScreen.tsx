import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Screen } from './Screen';
import { TypewriterText } from './TypewriterText';
import { GameScreen } from '@/hooks/useGameState';
import { User, Zap, Target, LogOut, Trophy, FileText } from 'lucide-react';

interface MenuScreenProps {
  isActive: boolean;
  onNavigate: (screen: GameScreen) => void;
  onShowInstructions?: () => void;
  onHover?: () => void;
  onClick?: () => void;
}

const menuItems = [
  { id: 'player', label: 'PLAYER', icon: User, description: 'View profile stats' },
  { id: 'skills', label: 'SKILLS', icon: Zap, description: 'Abilities & tech stack' },
  { id: 'missions', label: 'MISSIONS', icon: Target, description: 'Completed projects' },
  { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy, description: 'Badges & certifications' },
  { id: 'instructions', label: 'INSTRUCTIONS', icon: FileText, description: 'System protocols & guides' },
  { id: 'exit', label: 'EXIT', icon: LogOut, description: 'Contact & connect' },
] as const;

export function MenuScreen({ isActive, onNavigate, onShowInstructions, onHover, onClick }: MenuScreenProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;

    gsap.fromTo(
      itemRefs.current.filter(Boolean),
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
    );
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : menuItems.length - 1;
          onHover?.();
          return newIndex;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev < menuItems.length - 1 ? prev + 1 : 0;
          onHover?.();
          return newIndex;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onClick?.();
        onClick?.();
        if (menuItems[selectedIndex].id === 'instructions') {
          onShowInstructions?.();
        } else {
          onNavigate(menuItems[selectedIndex].id as GameScreen);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, selectedIndex, onNavigate, onHover, onClick]);

  return (
    <Screen isActive={isActive}>
      <div className="flex flex-col items-center gap-6 md:gap-8 px-4">
        <h2 className="font-display text-2xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] text-primary glow-text mb-4 md:mb-8">
          <TypewriterText text="MAIN MENU" speed={60} isActive={isActive} />
        </h2>

        <div ref={menuRef} className="flex flex-col gap-1 md:gap-2 w-full max-w-md">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => {
                onClick?.();
                if (item.id === 'instructions') {
                  onShowInstructions?.();
                } else {
                  onNavigate(item.id as GameScreen);
                }
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setSelectedIndex(index);
                onHover?.();
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`menu-item flex items-center gap-3 md:gap-4 text-left py-3 md:py-4 px-4 md:px-8 text-base md:text-xl ${selectedIndex === index ? 'active' : ''
                }`}
            >
              <item.icon className="w-5 h-5 md:w-6 md:h-6" />
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-[10px] md:text-xs text-muted-foreground normal-case tracking-normal font-sans">
                  {item.description}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 md:mt-8 text-xs md:text-sm text-muted-foreground tracking-wider text-center">
          Use <span className="text-primary font-display">↑↓</span> to navigate,{' '}
          <span className="text-primary font-display">ENTER</span> to select
          <br />
          <span className="md:hidden text-muted-foreground/70">Swipe right to go back</span>
        </div>
      </div>
    </Screen>
  );
}
