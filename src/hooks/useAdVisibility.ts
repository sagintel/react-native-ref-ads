import { useState, useEffect, useRef, useCallback } from 'react';
import { ViewToken, ViewabilityConfig } from 'react-native';

interface UseAdVisibilityOptions {
  threshold?: number;
  minViewTime?: number;
  onViewable?: () => void;
  onHidden?: () => void;
}

export function useAdVisibility({
  threshold = 0.5,
  minViewTime = 1000,
  onViewable,
  onHidden,
}: UseAdVisibilityOptions) {
  const [isViewable, setIsViewable] = useState(false);
  const [hasBeenViewable, setHasBeenViewable] = useState(false);
  const viewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewStartTimeRef = useRef<number>(0);

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: threshold * 100,
    minimumViewTime: minViewTime,
  };

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const isCurrentlyViewable = viewableItems.length > 0 && viewableItems[0].isViewable;

      if (isCurrentlyViewable && !isViewable) {
        viewStartTimeRef.current = Date.now();
        viewTimerRef.current = setTimeout(() => {
          setIsViewable(true);
          setHasBeenViewable(true);
          onViewable?.();
        }, minViewTime);
      } else if (!isCurrentlyViewable && isViewable) {
        if (viewTimerRef.current) {
          clearTimeout(viewTimerRef.current);
          viewTimerRef.current = null;
        }
        setIsViewable(false);
        onHidden?.();
      }
    },
    [isViewable, minViewTime, onViewable, onHidden]
  );

  useEffect(() => {
    return () => {
      if (viewTimerRef.current) clearTimeout(viewTimerRef.current);
    };
  }, []);

  return {
    isViewable,
    hasBeenViewable,
    viewabilityConfig,
    onViewableItemsChanged,
  };
}
