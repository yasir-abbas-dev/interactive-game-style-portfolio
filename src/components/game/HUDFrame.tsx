import { ReactNode } from 'react';

interface HUDFrameProps {
  children: ReactNode;
}

export function HUDFrame({ children }: HUDFrameProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top left corner */}
      <div className="absolute top-4 left-4 w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent" />
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary" />
      </div>

      {/* Top right corner */}
      <div className="absolute top-4 right-4 w-24 h-24">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-primary to-transparent" />
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-primary" />
      </div>

      {/* Bottom left corner */}
      <div className="absolute bottom-4 left-4 w-24 h-24">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent" />
        <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-primary" />
      </div>

      {/* Bottom right corner */}
      <div className="absolute bottom-4 right-4 w-24 h-24">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-primary to-transparent" />
        <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary" />
      </div>

      {/* Top center status bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-primary" />
        <div className="font-display text-xs tracking-[0.3em] text-primary uppercase">System Online</div>
        <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-primary" />
      </div>

      {children}
    </div>
  );
}
