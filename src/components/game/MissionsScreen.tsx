import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Screen } from './Screen';
import { TypewriterText } from './TypewriterText';
import { useLongPress } from '@/hooks/useLongPress';
import { ArrowLeft, ExternalLink, Check, Clock } from 'lucide-react';

const TiltCard = ({ 
  children, 
  className, 
  onClick,
  onLongPress,
  onLongPressEnd 
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  onLongPress?: () => void;
  onLongPressEnd?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { handlers, isPressed } = useLongPress({
    onLongPress: onLongPress || (() => {}),
    onLongPressEnd,
    threshold: 400,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className || ''} ${isPressed ? 'ring-2 ring-primary scale-[1.02]' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...handlers}
    >
      {children}
    </div>
  );
};

interface MissionsScreenProps {
  isActive: boolean;
  onBack: () => void;
}

const missions = [
  {
    id: 1,
    name: 'Game-Style Portfolio Website',
    status: 'COMPLETED',
    difficulty: 'HARD',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    description: 'Interactive portfolio designed like a game menu with smooth animations and keyboard navigation.',
    xp: 3000,
  },
  {
    id: 2,
    name: 'Animated Landing Page',
    status: 'COMPLETED',
    difficulty: 'MEDIUM',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description: 'Smooth scroll animations, hover effects, and modern UI design for maximum engagement.',
    xp: 1800,
  },
  {
    id: 3,
    name: 'Personal Website',
    status: 'COMPLETED',
    difficulty: 'EASY',
    tech: ['HTML', 'CSS', 'Responsive Design'],
    description: 'Clean and responsive website to showcase skills and projects professionally.',
    xp: 1200,
  },
];

export function MissionsScreen({ isActive, onBack }: MissionsScreenProps) {
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [expandedMission, setExpandedMission] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;

    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
    );
  }, [isActive]);

  const handleLongPress = (missionId: number) => {
    setExpandedMission(missionId);
  };

  const handleLongPressEnd = () => {
    setExpandedMission(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'text-green-400';
      case 'MEDIUM':
        return 'text-accent';
      case 'HARD':
        return 'text-orange-400';
      case 'EXPERT':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Screen isActive={isActive}>
      <button
        onClick={onBack}
        className="absolute top-16 md:top-20 left-4 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display tracking-wider text-sm md:text-base"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        BACK
      </button>

      <div className="flex flex-col items-center gap-4 md:gap-8 px-4 max-w-5xl w-full pt-12 md:pt-0">
        <h2 className="font-display text-2xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] text-primary glow-text">
          <TypewriterText text="MISSIONS LOG" speed={60} isActive={isActive} />
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto max-h-[60vh] md:max-h-none pb-4">
          {missions.map((mission, index) => (
            <TiltCard
              key={mission.id}
              className="mission-card"
              onClick={() => setSelectedMission(mission.id === selectedMission ? null : mission.id)}
              onLongPress={() => handleLongPress(mission.id)}
              onLongPressEnd={handleLongPressEnd}
            >
              <div ref={(el) => (cardRefs.current[index] = el)}>
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display text-xl text-foreground">{mission.name}</h3>
                  <span className={`text-xs font-display ${getDifficultyColor(mission.difficulty)}`}>
                    {mission.difficulty}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-display ${
                    mission.status === 'COMPLETED' ? 'text-primary' : 'text-accent'
                  }`}
                >
                  {mission.status === 'COMPLETED' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {mission.status}
                </div>
              </div>

              {/* Description - Expanded on long press */}
              <p className={`text-sm text-muted-foreground mb-4 ${expandedMission === mission.id ? '' : 'line-clamp-2'}`}>
                {mission.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mission.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs font-display bg-muted rounded border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* XP Reward */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Reward</span>
                <span className="font-display text-accent">+{mission.xp} XP</span>
              </div>

              {/* View Project Link */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-primary" />
              </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <p className="text-xs md:text-sm text-muted-foreground">
          Press <span className="text-primary font-display">ESC</span> to return
          <span className="md:hidden"> • Hold to see details</span>
        </p>
      </div>
    </Screen>
  );
}
