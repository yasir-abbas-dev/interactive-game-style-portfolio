import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioControlsProps {
  isMuted: boolean;
  isAmbientOn: boolean;
  onToggleMute: () => void;
  onToggleAmbient: () => void;
}

export function AudioControls({
  isMuted,
  isAmbientOn,
  onToggleMute,
  onToggleAmbient,
}: AudioControlsProps) {
  return (
    <div className="absolute bottom-4 right-8 flex items-center gap-2 z-50">
      <button
        onClick={onToggleAmbient}
        className={`w-10 h-10 flex items-center justify-center rounded border transition-colors ${
          isAmbientOn
            ? 'border-primary text-primary bg-primary/10'
            : 'border-muted-foreground/50 text-muted-foreground hover:border-primary hover:text-primary'
        }`}
        title={isAmbientOn ? 'Stop ambient music' : 'Play ambient music'}
      >
        <Music className="w-4 h-4" />
      </button>
      <button
        onClick={onToggleMute}
        className={`w-10 h-10 flex items-center justify-center rounded border transition-colors ${
          isMuted
            ? 'border-destructive text-destructive'
            : 'border-muted-foreground/50 text-muted-foreground hover:border-primary hover:text-primary'
        }`}
        title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
