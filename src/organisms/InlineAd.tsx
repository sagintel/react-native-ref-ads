import React, { useCallback } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { AdConfig } from '../types';
import { useAdLogic } from '../hooks/useAdLogic';
import { openAdUrl } from '../utils/linking';
import { AdImage } from '../atoms/AdImage';
import { AdTitle } from '../atoms/AdTitle';
import { AdBadge } from '../atoms/AdBadge';
import { ThemeProvider } from '../theme/ThemeProvider';

interface InlineAdProps {
  config: AdConfig;
  onStateChange?: (visible: boolean) => void;
}

export const InlineAd: React.FC<InlineAdProps> = ({ config, onStateChange }) => {
  const { state, handleClick } = useAdLogic({
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
      <Pressable
        onPress={handlePress}
        style={[styles.container, config.styleOverrides?.container]}
        accessibilityLabel={config.accessibility?.label || `Inline advertisement: ${config.content.title}`}
        accessibilityHint={config.accessibility?.hint || 'Tap to open'}
        accessibilityRole={config.accessibility?.role || 'link'}
      >
        {config.content.icon && (
          <AdImage
            source={config.content.icon}
            style={styles.icon}
            contentFit="cover"
          />
        )}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <AdTitle text={config.content.title} style={styles.title} numberOfLines={1} />
            {config.content.badge && <AdBadge text={config.content.badge} />}
          </View>
          {config.content.description && (
            <Text style={styles.description} numberOfLines={2}>
              {config.content.description}
            </Text>
          )}
        </View>
      </Pressable>
    </ThemeProvider>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginVertical: 4,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
  },
  description: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
});
