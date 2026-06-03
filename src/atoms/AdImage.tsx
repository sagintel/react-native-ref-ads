import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { Image } from 'expo-image';
import { AdImageProps } from '../types';
import { useAdTheme } from '../theme/ThemeProvider';

export const AdImage: React.FC<AdImageProps> = ({
  source,
  style,
  resizeMode = 'cover',
  contentFit = 'cover',
  onLoad,
  onError,
  accessibilityLabel,
}) => {
  const { theme } = useAdTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(
    (error: any) => {
      setIsLoading(false);
      setHasError(true);
      onError?.(error);
    },
    [onError]
  );

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Image
        source={source}
        style={[{ width: '100%', height: '100%' }, style]}
        contentFit={contentFit}
        transition={300}
        onLoad={handleLoad}
        onError={handleError}
        accessibilityLabel={accessibilityLabel || 'Advertisement image'}
      />
      {isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
          }}
        >
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      )}
      {hasError && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.surface,
          }}
        >
          <Text style={theme.fonts.caption}>Failed to load image</Text>
        </View>
      )}
    </View>
  );
};

// Need to import StyleSheet and Text for the error state
import { StyleSheet, Text } from 'react-native';
