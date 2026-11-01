import { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useAudio } from '@/hooks/useAudio';
import { useScreenShake } from '@/hooks/useScreenShake';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { HUDFrame } from './HUDFrame';
import { LoadingScreen } from './LoadingScreen';
import { StartScreen } from './StartScreen';
import { MenuScreen } from './MenuScreen';
import { PlayerScreen } from './PlayerScreen';
import { SkillsScreen } from './SkillsScreen';
import { MissionsScreen } from './MissionsScreen';
import { AchievementsScreen } from './AchievementsScreen';
import { NotificationPanel } from './NotificationPanel';
import { NotificationScreen } from './NotificationScreen';
import { ExitScreen } from './ExitScreen';
import { AudioControls } from './AudioControls';
import { FloatingParticles } from './FloatingParticles';
import { CursorGlow } from './CursorGlow';

export function GameInterface() {
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const { currentScreen, navigateTo, goBack } = useGameState();
  const { playHover, playClick, playTransition, playSuccess, toggleMute, toggleAmbient, isMuted, isAmbientOn } = useAudio();
  const { shake } = useScreenShake();

  const handleNavigate = useCallback((screen: Parameters<typeof navigateTo>[0]) => {
    shake(4, 0.3);
    navigateTo(screen, playTransition);
  }, [navigateTo, playTransition, shake]);

  const handleBack = useCallback(() => {
    shake(3, 0.2);
    goBack(playTransition);
  }, [goBack, playTransition, shake]);

  const handleClick = useCallback(() => {
    playClick();
    shake(2, 0.15);
  }, [playClick, shake]);

  const handleLoadingComplete = () => {
    playSuccess();
    setIsLoading(false);
  };

  // Swipe right to go back (mobile gesture)
  useSwipeGesture({
    onSwipeRight: () => {
      if (currentScreen !== 'start') {
        handleBack();
      }
    },
    enabled: !isLoading && currentScreen !== 'start',
  });

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div id="game-container" className="w-full h-full bg-background">
      <FloatingParticles />
      <CursorGlow />
      <HUDFrame>
        {/* Bottom status bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-auto">
          <div className="text-xs font-display text-muted-foreground tracking-wider">
            v1.0.0
          </div>
          <div className="w-[1px] h-4 bg-border" />
          <div className="text-xs font-display text-primary tracking-wider">
            {currentScreen.toUpperCase()}
          </div>
        </div>
      </HUDFrame>

      <AudioControls
        isMuted={isMuted}
        isAmbientOn={isAmbientOn}
        onToggleMute={toggleMute}
        onToggleAmbient={toggleAmbient}
      />

      <NotificationScreen
        isActive={currentScreen === 'notification'}
        onContinue={() => handleNavigate('start')}
      />

      <StartScreen
        isActive={currentScreen === 'start'}
        onStart={() => {
          handleClick();
          handleNavigate('menu');
        }}
      />

      <MenuScreen
        isActive={currentScreen === 'menu'}
        onNavigate={handleNavigate}
        onShowInstructions={() => setShowInstructions(true)}
        onHover={playHover}
        onClick={handleClick}
      />

      <PlayerScreen
        isActive={currentScreen === 'player'}
        onBack={handleBack}
      />

      <SkillsScreen
        isActive={currentScreen === 'skills'}
        onBack={handleBack}
      />

      <MissionsScreen
        isActive={currentScreen === 'missions'}
        onBack={handleBack}
      />

      <AchievementsScreen
        isActive={currentScreen === 'achievements'}
        onBack={handleBack}
      />

      <NotificationPanel
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <ExitScreen
        isActive={currentScreen === 'exit'}
        onBack={handleBack}
      />
    </div>
  );
}
