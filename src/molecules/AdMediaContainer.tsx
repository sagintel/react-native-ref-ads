import React from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { AdMediaSource } from '../types';
import { AdImage } from '../atoms/AdImage';
import { AdVideo } from '../atoms/AdVideo';
import { useAdMedia } from '../hooks/useAdMedia';

interface AdMediaContainerProps {
  media?: AdMediaSource | AdMediaSource[];
  style?: StyleProp<ViewStyle>;
  onVideoComplete?: () => void;
  onVideoStart?: () => void;
  onMediaError?: (error: Error) => void;
  aspectRatio?: number;
}

export const AdMediaContainer: React.FC<AdMediaContainerProps> = ({
  media,
  style,
  onVideoComplete,
  onVideoStart,
  onMediaError,
  aspectRatio = 16 / 9,
}) => {
  const { currentMedia, isLoading, hasError, handleMediaLoad, handleMediaError, handleVideoStatusUpdate } = useAdMedia({
    media,
    onVideoComplete,
    onVideoStart,
    onMediaError,
  });

  if (!currentMedia) return null;

  const containerStyle: ViewStyle = {
    aspectRatio,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 8,
  };

  return (
    <View style={[containerStyle, style]}>
      {currentMedia.type === 'video' ? (
        <AdVideo
          source={{ uri: currentMedia.uri }}
          style={StyleSheet.absoluteFill}
          resizeMode={currentMedia.resizeMode || 'cover'}
          shouldPlay={currentMedia.autoPlay ?? true}
          isLooping={currentMedia.loop ?? false}
          isMuted={currentMedia.muted ?? true}
          onPlaybackStatusUpdate={handleVideoStatusUpdate}
          onError={handleMediaError}
        />
      ) : (
        <AdImage
          source={{ uri: currentMedia.uri }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          onLoad={handleMediaLoad}
          onError={handleMediaError}
        />
      )}
    </View>
  );
};
