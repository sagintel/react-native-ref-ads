import { useState, useCallback } from 'react';
import { AdMediaSource, VideoPlaybackStatus } from '../types';

interface UseAdMediaOptions {
  media?: AdMediaSource | AdMediaSource[];
  onVideoComplete?: () => void;
  onVideoStart?: () => void;
  onMediaError?: (error: Error) => void;
}

export function useAdMedia({ media, onVideoComplete, onVideoStart, onMediaError }: UseAdMediaOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const mediaArray = Array.isArray(media) ? media : media ? [media] : [];
  const currentMedia = mediaArray[currentIndex];

  const handleMediaLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleMediaError = useCallback(
    (error: Error) => {
      setIsLoading(false);
      setHasError(true);
      onMediaError?.(error);
    },
    [onMediaError]
  );

  const handleVideoStatusUpdate = useCallback(
    (status: VideoPlaybackStatus) => {
      if (status.isLoaded) {
        if (status.isPlaying && status.positionMillis === 0) {
          onVideoStart?.();
        }
        if (status.didJustFinish) {
          onVideoComplete?.();
          if (currentIndex < mediaArray.length - 1) {
            setCurrentIndex(prev => prev + 1);
          }
        }
      }
    },
    [currentIndex, mediaArray.length, onVideoComplete, onVideoStart]
  );

  const goToNext = useCallback(() => {
    if (currentIndex < mediaArray.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, mediaArray.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  return {
    currentMedia,
    currentIndex,
    totalMedia: mediaArray.length,
    isLoading,
    hasError,
    hasMultiple: mediaArray.length > 1,
    handleMediaLoad,
    handleMediaError,
    handleVideoStatusUpdate,
    goToNext,
    goToPrevious,
  };
}
