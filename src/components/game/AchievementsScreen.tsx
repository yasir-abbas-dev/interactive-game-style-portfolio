import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Screen } from './Screen';
import { ArrowLeft, Trophy, Award, Star, Zap, Code, Rocket, Shield, Heart } from 'lucide-react';

interface AchievementsScreenProps {
  isActive: boolean;
  onBack: () => void;
}

const achievements = [
  {
    id: 1,
    name: 'First Blood',
    description: 'Completed first project',
    icon: Trophy,
    unlocked: true,
    rarity: 'common',
    date: '2020',
  },
  {
    id: 2,
    name: 'Code Warrior',
    description: '10,000+ lines of code written',
    icon: Code,
    unlocked: true,
    rarity: 'rare',
    date: '2021',
  },
  {
    id: 3,
    name: 'Early Adopter',
    description: 'Mastered 5 frameworks',
    icon: Zap,
    unlocked: true,
    rarity: 'epic',
    date: '2022',
  },
  {
    id: 4,
    name: 'Launch Master',
    description: 'Deployed 20+ projects',
    icon: Rocket,
    unlocked: true,
    rarity: 'legendary',
    date: '2023',
  },
  {
    id: 5,
    name: 'Bug Hunter',
    description: 'Fixed 500+ bugs',
    icon: Shield,
    unlocked: true,
    rarity: 'rare',
    date: '2022',
  },
  {
    id: 6,
    name: 'Team Player',
    description: 'Collaborated on 10+ team projects',
    icon: Heart,
    unlocked: true,
    rarity: 'common',
    date: '2021',
  },
  {
    id: 7,
    name: 'Certification: AWS',
    description: 'AWS Solutions Architect',
    icon: Award,
    unlocked: true,
    rarity: 'epic',
    date: '2023',
  },
  {
    id: 8,
    name: 'Perfectionist',
    description: '100% test coverage on a project',
    icon: Star,
    unlocked: false,
    rarity: 'legendary',
    date: null,
  },
];

const rarityStyles = {
  common: {
    border: 'border-muted-foreground/50',
    bg: 'bg-muted/30',
    text: 'text-muted-foreground',
    glow: '',
  },
  rare: {
    border: 'border-primary',
    bg: 'bg-primary/10',
    text: 'text-primary',
    glow: 'shadow-[0_0_15px_hsl(var(--primary)/0.3)]',
  },
  epic: {
    border: 'border-secondary',
    bg: 'bg-secondary/10',
    text: 'text-secondary',
    glow: 'shadow-[0_0_15px_hsl(var(--secondary)/0.3)]',
  },
  legendary: {
    border: 'border-accent',
    bg: 'bg-accent/10',
    text: 'text-accent',
    glow: 'shadow-[0_0_20px_hsl(var(--accent)/0.4)]',
  },
};

export function AchievementsScreen({ isActive, onBack }: AchievementsScreenProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;

    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { scale: 0.8, opacity: 0, rotateY: -15 },
      {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.2)',
        delay: 0.2,
      }
    );
  }, [isActive]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <Screen isActive={isActive}>
      <button
        onClick={onBack}
        className="absolute top-16 md:top-20 left-4 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display tracking-wider text-sm md:text-base z-10"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        BACK
      </button>

      <div className="flex flex-col items-center gap-4 md:gap-6 px-4 max-w-5xl w-full overflow-y-auto max-h-[85vh] py-8 pt-12 md:pt-8">
        <div className="text-center">
          <h2 className="font-display text-2xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] text-primary glow-text">
            ACHIEVEMENTS
          </h2>
          <p className="mt-2 font-display text-sm md:text-lg text-muted-foreground">
            {unlockedCount} / {achievements.length} UNLOCKED
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Rarity legend */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-[10px] md:text-xs font-display">
          {Object.entries(rarityStyles).map(([rarity, styles]) => (
            <div key={rarity} className="flex items-center gap-1 md:gap-2">
              <div className={`w-2 h-2 md:w-3 md:h-3 rounded border ${styles.border} ${styles.bg}`} />
              <span className={styles.text}>{rarity.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* Achievements grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {achievements.map((achievement, index) => {
            const styles = rarityStyles[achievement.rarity as keyof typeof rarityStyles];
            const Icon = achievement.icon;

            return (
              <div
                key={achievement.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`relative p-3 md:p-4 rounded-lg border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? `${styles.border} ${styles.bg} ${styles.glow} hover:scale-105`
                    : 'border-muted bg-muted/10 opacity-50'
                }`}
              >
                {/* Lock overlay */}
                {!achievement.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-10">
                    <span className="font-display text-xs md:text-sm text-muted-foreground">LOCKED</span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-2 md:mb-3 ${
                    achievement.unlocked ? styles.bg : 'bg-muted'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 md:w-6 md:h-6 ${achievement.unlocked ? styles.text : 'text-muted-foreground'}`}
                  />
                </div>

                {/* Content */}
                <h3
                  className={`font-display text-xs md:text-sm mb-1 ${
                    achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {achievement.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-2 line-clamp-2">{achievement.description}</p>

                {/* Date */}
                {achievement.unlocked && achievement.date && (
                  <p className={`text-[10px] md:text-xs font-display ${styles.text}`}>{achievement.date}</p>
                )}

                {/* Rarity badge */}
                <div
                  className={`absolute top-1 right-1 md:top-2 md:right-2 text-[8px] md:text-[10px] font-display tracking-wider ${styles.text}`}
                >
                  {achievement.rarity.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs md:text-sm text-muted-foreground mt-4">
          Press <span className="text-primary font-display">ESC</span> to return
        </p>
      </div>
    </Screen>
  );
}
