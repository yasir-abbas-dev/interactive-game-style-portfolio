import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Screen } from './Screen';
import { ArrowLeft } from 'lucide-react';

const TiltCard = ({ children, className, innerRef }: { children: React.ReactNode; className?: string; innerRef?: (el: HTMLDivElement | null) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }, []);

  return (
    <div
      ref={(el) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        innerRef?.(el);
      }}
      className={`tilt-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

interface SkillsScreenProps {
  isActive: boolean;
  onBack: () => void;
}

const skills = [
  { name: 'HTML5', level: 90, category: 'Frontend' },
  { name: 'CSS3 (Flexbox, Grid, Animations)', level: 85, category: 'Frontend' },
  { name: 'JavaScript (ES6+)', level: 80, category: 'Languages' },
  { name: 'GSAP Animations', level: 70, category: 'Animation' },
  { name: 'Responsive Web Design', level: 85, category: 'Frontend' },
  { name: 'UI / UX Design Basics', level: 75, category: 'Design' },
];

export function SkillsScreen({ isActive, onBack }: SkillsScreenProps) {
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isActive) return;

    gsap.fromTo(
      skillRefs.current.filter(Boolean),
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
    );

    barRefs.current.filter(Boolean).forEach((bar, index) => {
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.4 + index * 0.05,
            ease: 'power2.out',
            transformOrigin: 'left',
          }
        );
      }
    });
  }, [isActive]);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <Screen isActive={isActive}>
      <button
        onClick={onBack}
        className="absolute top-16 md:top-20 left-4 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display tracking-wider text-sm md:text-base"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        BACK
      </button>

      <div className="flex flex-col items-center gap-4 md:gap-8 px-4 max-w-4xl w-full pt-12 md:pt-0">
        <h2 className="font-display text-2xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] text-primary glow-text">
          ABILITIES
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto max-h-[55vh] md:max-h-none pb-4">
          {skills.map((skill, index) => (
            <TiltCard
              key={skill.name}
              innerRef={(el) => (skillRefs.current[index] = el)}
              className="p-3 md:p-4 hud-border bg-card"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-display text-sm md:text-lg text-foreground">{skill.name}</span>
                  <span className="ml-2 md:ml-3 text-xs text-secondary font-display">{skill.category}</span>
                </div>
                <span className="font-display text-primary text-sm md:text-base">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  ref={(el) => (barRefs.current[index] = el)}
                  className="skill-bar-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="mt-2 flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-sm ${
                      i < skill.level / 10 ? 'bg-primary/60' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-2 md:mt-4">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-sm bg-secondary" />
              <span className="text-muted-foreground">{cat}</span>
            </div>
          ))}
        </div>

        <p className="text-xs md:text-sm text-muted-foreground">
          Press <span className="text-primary font-display">ESC</span> to return
        </p>
      </div>
    </Screen>
  );
}
