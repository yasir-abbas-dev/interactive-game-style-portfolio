import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth follow for main glow
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

      // Slower follow for trail
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x - 20}px, ${currentPos.current.y - 20}px)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 40}px, ${trailPos.current.y - 40}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Trail glow (larger, slower) */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-50 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsla(180, 100%, 50%, 0.15) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      
      {/* Main cursor glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-50 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsla(180, 100%, 60%, 0.4) 0%, hsla(180, 100%, 50%, 0.1) 40%, transparent 70%)',
          boxShadow: '0 0 20px hsla(180, 100%, 50%, 0.3), 0 0 40px hsla(180, 100%, 50%, 0.1)',
        }}
      />
    </>
  );
}
