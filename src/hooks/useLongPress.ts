import { useCallback, useRef, useState } from 'react';

interface LongPressOptions {
  onLongPress: () => void;
  onLongPressEnd?: () => void;
  threshold?: number;
}

export function useLongPress({
  onLongPress,
  onLongPressEnd,
  threshold = 500,
}: LongPressOptions) {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const start = useCallback(() => {
    isLongPressRef.current = false;
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setIsPressed(true);
      onLongPress();
    }, threshold);
  }, [onLongPress, threshold]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (isLongPressRef.current) {
      setIsPressed(false);
      onLongPressEnd?.();
    }
    isLongPressRef.current = false;
  }, [onLongPressEnd]);

  const handlers = {
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchCancel: stop,
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
  };

  return { handlers, isPressed };
}
