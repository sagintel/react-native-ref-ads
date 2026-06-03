import React, { useCallback } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { AdConfig } from '../types';
import { useAdLogic } from '../hooks/useAdLogic';
import { openAdUrl } from '../utils/linking';
import { AdMediaContainer } from '../molecules/AdMediaContainer';
import { AdHeader } from '../molecules/AdHeader';
import { AdFooter } from '../molecules/AdFooter';
import { ThemeProvider } from '../theme/ThemeProvider';

interface NativeAdProps {
  config: AdConfig;
  onStateChange?: (visible: boolean) => void;
}

export const NativeAd: React.FC<NativeAdProps> = ({ config, onStateChange }) => {
  const { state, handleClick, handleError } = useAdLogic({
    config,
    onStateChange: s => onStateChange?.(s.isVisible),
  });

  const handlePress = useCallback(async () => {
    if (config.content.ctaUrl) {
      const opened = await openAdUrl(config.content.ctaUrl);
      if (opened) {
        handleClick(config.content.ctaUrl);
      }
    }
  }, [config.content.ctaUrl, handleClick]);

  if (!state.isVisible) return null;

  return (
    <ThemeProvider theme={config.theme}>
      <View
        style={[styles.container, config.styleOverrides?.container]}
        accessibilityLabel={config.accessibility?.label || `Native advertisement: ${config.content.title}`}
        accessibilityHint={config.accessibility?.hint || 'Double tap to interact'}
        accessibilityRole={config.accessibility?.role || 'button'}
      >
        <Pressable onPress={handlePress} style={styles.pressable}>
          <AdMediaContainer
            media={config.content.media}
            style={[styles.media, config.styleOverrides?.mediaContainer]}
            aspectRatio={16 / 9}
          />
          <View style={styles.content}>
            <AdHeader content={config.content} showBadge showIcon />
            <AdFooter content={config.content} onCtaPress={handlePress} />
          </View>
        </Pressable>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pressable: {
    width: '100%',
  },
  media: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
});
