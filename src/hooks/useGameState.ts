import { useState, useCallback, useEffect } from 'react';

export type GameScreen = 'start' | 'menu' | 'player' | 'skills' | 'missions' | 'achievements' | 'exit' | 'notification';

export function useGameState() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('notification');
  const [previousScreen, setPreviousScreen] = useState<GameScreen | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = useCallback((screen: GameScreen, onTransition?: () => void) => {
    if (isTransitioning || screen === currentScreen) return;

    setIsTransitioning(true);
    setPreviousScreen(currentScreen);
    onTransition?.();

    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
    }, 300);
  }, [currentScreen, isTransitioning]);

  const goBack = useCallback((onTransition?: () => void) => {
    if (currentScreen === 'start') return;
    if (currentScreen === 'menu') {
      navigateTo('start', onTransition);
    } else {
      navigateTo('menu', onTransition);
    }
  }, [currentScreen, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        goBack();
      }
      if (e.key === 'Enter' && currentScreen === 'start') {
        navigateTo('menu');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, goBack, navigateTo]);

  return {
    currentScreen,
    previousScreen,
    isTransitioning,
    navigateTo,
    goBack,
  };
}
