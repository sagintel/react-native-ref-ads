import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { AdVideoProps, VideoPlaybackStatus } from '../types';
import { useAdTheme } from '../theme/ThemeProvider';

export const AdVideo: React.FC<AdVideoProps> = ({
  source,
  style,
  resizeMode = ResizeMode.COVER,
  shouldPlay = true,
  isLooping = false,
  isMuted = true,
  volume = 1.0,
  onPlaybackStatusUpdate,
  onReadyForDisplay,
  onError,
  accessibilityLabel,
}) => {
  const { theme } = useAdTheme();
  const videoRef = useRef<Video>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handlePlaybackStatusUpdate = useCallback(
    (status: VideoPlaybackStatus) => {
      if (status.isLoaded) {
        setIsLoading(false);
      }
      onPlaybackStatusUpdate?.(status);
    },
    [onPlaybackStatusUpdate]
  );

  const handleReadyForDisplay = useCallback(() => {
    setIsLoading(false);
    onReadyForDisplay?.();
  }, [onReadyForDisplay]);

  const handleError = useCallback(
    (error: any) => {
      setIsLoading(false);
      setHasError(true);
      onError?.(error);
    },
    [onError]
  );

  const handleReplay = useCallback(() => {
    videoRef.current?.replayAsync();
  }, []);

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Video
        ref={videoRef}
        source={source}
        style={[{ width: '100%', height: '100%' }, style]}
        resizeMode={resizeMode}
        shouldPlay={shouldPlay}
        isLooping={isLooping}
        isMuted={isMuted}
        volume={volume}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onReadyForDisplay={handleReadyForDisplay}
        onError={handleError}
        accessibilityLabel={accessibilityLabel || 'Advertisement video'}
      />
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, styles.overlay]}>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
      )}
      {hasError && (
        <View style={[StyleSheet.absoluteFill, styles.overlay, { backgroundColor: theme.colors.error + '20' }]}>
          <Text style={[theme.fonts.caption, { color: theme.colors.error }]}>Video failed to load</Text>
        </View>
      )}
    </View>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
