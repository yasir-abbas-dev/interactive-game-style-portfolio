import { gsap } from 'gsap';

export function useScreenShake() {
  const shake = (intensity: number = 5, duration: number = 0.4) => {
    const container = document.getElementById('game-container');
    if (!container) return;

    gsap.to(container, {
      x: `random(-${intensity}, ${intensity})`,
      y: `random(-${intensity}, ${intensity})`,
      duration: 0.05,
      repeat: Math.floor(duration / 0.05),
      yoyo: true,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.set(container, { x: 0, y: 0 });
      }
    });
  };

  return { shake };
}
