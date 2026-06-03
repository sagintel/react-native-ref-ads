import { useState, useEffect, useCallback, useRef } from 'react';
import { AdBehavior, AdCallbacks, AdConfig, AdState, AdStatus } from '../types';
import { DEFAULT_AD_TIMEOUT, DEFAULT_COUNTDOWN_DURATION, DEFAULT_CLOSE_BUTTON_DELAY } from '../utils/constants';

interface UseAdLogicOptions {
  config: AdConfig;
  onStateChange?: (state: AdState) => void;
}

export function useAdLogic({ config, onStateChange }: UseAdLogicOptions) {
  const { behavior = {}, callbacks = {} } = config;
  const {
    autoShow = true,
    autoCloseDelay,
    showCloseButton = true,
    closeButtonDelay = DEFAULT_CLOSE_BUTTON_DELAY,
    countdownDuration = DEFAULT_COUNTDOWN_DURATION,
    showCountdown = false,
    trackImpression = true,
    minViewTime = 1000,
  } = behavior;

  const [state, setState] = useState<AdState>({
    status: 'idle',
    isVisible: false,
    timeLeft: countdownDuration,
    progress: 0,
    isPlaying: false,
    isMuted: true,
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    hasImpression: false,
    hasClicked: false,
    hasRewarded: false,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const impressionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);

  const updateState = useCallback(
    (updates: Partial<AdState>) => {
      setState(prev => {
        const next = { ...prev, ...updates };
        onStateChange?.(next);
        return next;
      });
    },
    [onStateChange]
  );

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (impressionRef.current) clearTimeout(impressionRef.current);
  }, []);

  const startCountdown = useCallback(() => {
    if (!showCountdown) return;

    updateState({ timeLeft: countdownDuration, progress: 0 });

    intervalRef.current = setInterval(() => {
      setState(prev => {
        const newTimeLeft = Math.max(0, prev.timeLeft - 100);
        const newProgress = 1 - newTimeLeft / countdownDuration;

        if (newTimeLeft <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          callbacks.onCountdownComplete?.();
        }

        const next = { ...prev, timeLeft: newTimeLeft, progress: newProgress };
        onStateChange?.(next);
        return next;
      });
    }, 100);
  }, [countdownDuration, showCountdown, callbacks, onStateChange]);

  const startAutoClose = useCallback(() => {
    if (!autoCloseDelay) return;
    timeoutRef.current = setTimeout(() => {
      hide();
    }, autoCloseDelay);
  }, [autoCloseDelay]);

  const trackImpressionTimer = useCallback(() => {
    if (!trackImpression) return;
    impressionRef.current = setTimeout(() => {
      updateState({ hasImpression: true });
      callbacks.onImpression?.();
    }, minViewTime);
  }, [trackImpression, minViewTime, callbacks, updateState]);

  const show = useCallback(() => {
    clearTimers();
    startTimeRef.current = Date.now();
    updateState({ status: 'showing', isVisible: true, isPlaying: true });
    callbacks.onShow?.();
    startCountdown();
    startAutoClose();
    trackImpressionTimer();
  }, [clearTimers, updateState, callbacks, startCountdown, startAutoClose, trackImpressionTimer]);

  const hide = useCallback(() => {
    clearTimers();
    updateState({ status: 'closed', isVisible: false, isPlaying: false });
    callbacks.onHide?.();
    callbacks.onClose?.();
  }, [clearTimers, updateState, callbacks]);

  const pause = useCallback(() => {
    updateState({ status: 'paused', isPlaying: false });
  }, [updateState]);

  const resume = useCallback(() => {
    updateState({ status: 'showing', isPlaying: true });
  }, [updateState]);

  const handleClick = useCallback(
    (url?: string) => {
      updateState({ hasClicked: true });
      callbacks.onClick?.(url);
    },
    [updateState, callbacks]
  );

  const handleReward = useCallback(() => {
    if (!state.hasRewarded) {
      updateState({ hasRewarded: true });
      callbacks.onReward?.('default');
    }
  }, [state.hasRewarded, updateState, callbacks]);

  const handleError = useCallback(
    (error: Error) => {
      updateState({ status: 'error', error });
      callbacks.onError?.(error);
    },
    [updateState, callbacks]
  );

  useEffect(() => {
    if (autoShow) {
      const timer = setTimeout(() => show(), 100);
      return () => clearTimeout(timer);
    }
  }, [autoShow, show]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const canClose = showCloseButton && state.timeLeft <= Math.max(0, countdownDuration - closeButtonDelay);

  return {
    state,
    show,
    hide,
    pause,
    resume,
    handleClick,
    handleReward,
    handleError,
    canClose,
    isReady: state.status === 'ready' || state.status === 'showing',
    elapsedTime: Date.now() - startTimeRef.current,
  };
}
