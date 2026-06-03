import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAdTimerOptions {
  duration: number;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (timeLeft: number) => void;
}

export function useAdTimer({ duration, autoStart = true, onComplete, onTick }: UseAdTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, duration - elapsed);
      const prog = 1 - remaining / duration;

      setTimeLeft(remaining);
      setProgress(prog);
      onTick?.(remaining);

      if (remaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsRunning(false);
        onComplete?.();
      }
    }, 100);
  }, [duration, isRunning, onComplete, onTick]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    pause();
    setTimeLeft(duration);
    setProgress(0);
  }, [duration, pause]);

  const stop = useCallback(() => {
    pause();
    setTimeLeft(0);
    setProgress(1);
  }, [pause]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoStart, start]);

  return {
    timeLeft,
    progress,
    isRunning,
    start,
    pause,
    reset,
    stop,
    formattedTime: `${Math.ceil(timeLeft / 1000)}s`,
  };
}
