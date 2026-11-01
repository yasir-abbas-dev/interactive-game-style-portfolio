import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Screen } from './Screen';
import { ArrowLeft, MapPin, Calendar, Trophy } from 'lucide-react';
interface PlayerScreenProps {
  isActive: boolean;
  onBack: () => void;
}
export function PlayerScreen({
  isActive,
  onBack
}: PlayerScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const xpBarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isActive) return;
    const tl = gsap.timeline({
      delay: 0.3
    });
    tl.fromTo(cardRef.current, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out'
    }).fromTo(xpBarRef.current, {
      scaleX: 0
    }, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.out',
      transformOrigin: 'left'
    }, '-=0.3').fromTo(statsRef.current?.children || [], {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1
    }, '-=0.8');
  }, [isActive]);
  const stats = [{
    label: 'Projects Completed',
    value: '10+',
    icon: Trophy
  }, {
    label: 'Focus Area',
    value: 'UI/UX',
    icon: Calendar
  }, {
    label: 'Location',
    value: 'Pakistan',
    icon: MapPin
  }];
  return <Screen isActive={isActive}>
      <button onClick={onBack} className="absolute top-16 md:top-20 left-4 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display tracking-wider text-sm md:text-base">
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        BACK
      </button>

      <div className="flex flex-col items-center gap-4 md:gap-8 px-4 max-w-2xl w-full overflow-y-auto max-h-[85vh] pt-12 md:pt-0 pb-4">
        <h2 className="font-display text-2xl md:text-4xl tracking-[0.2em] md:tracking-[0.3em] text-primary glow-text">
          PLAYER PROFILE
        </h2>

        <div ref={cardRef} className="w-full p-4 md:p-8 hud-border hud-corner bg-card">
          {/* Avatar & Name */}
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8 text-center sm:text-left">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg border-2 border-primary bg-muted flex items-center justify-center overflow-hidden shrink-0">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center font-display text-2xl md:text-3xl text-primary">
                Y
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl md:text-3xl text-foreground">M.YASIR ABBAS</h3>
              <p className="text-muted-foreground font-display tracking-wider text-sm md:text-base">Frontend Web Developer</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="text-accent font-display text-xs md:text-sm">CREATIVE</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-secondary font-display text-xs md:text-sm">UI SPECIALIST</span>
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span className="text-muted-foreground">Growth Level</span>
              <span className="text-primary font-display">LEVELING UP</span>
            </div>
            <div className="xp-bar">
              <div ref={xpBarRef} className="xp-bar-fill" style={{
              width: '65%'
            }} />
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {stats.map(stat => <div key={stat.label} className="p-3 md:p-4 bg-muted/50 rounded border border-border flex items-center gap-3">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                <div>
                  <div className="font-display text-lg md:text-xl text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>)}
          </div>

          {/* Bio */}
          <div className="mt-6 md:mt-8 p-3 md:p-4 border-l-2 border-primary bg-primary/5">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              I'm a passionate frontend developer who loves building interactive, game-style and animated web experiences.
              I focus on clean UI, smooth animations, and turning ideas into engaging digital interfaces.
            </p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground">
          Press <span className="text-primary font-display">ESC</span> to return
        </p>
      </div>
    </Screen>;
}