import React, { useCallback, useRef } from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  Dimensions,
  AccessibilityInfo,
} from 'react-native';
import { AdConfig, AdAnimationConfig } from '../types';
import { useAdLogic } from '../hooks/useAdLogic';
import { openAdUrl } from '../utils/linking';
import { getAdSize, SCREEN_WIDTH } from '../utils/helpers';
import { AdMediaContainer } from '../molecules/AdMediaContainer';
import { AdHeader } from '../molecules/AdHeader';
import { AdFooter } from '../molecules/AdFooter';
import { ThemeProvider } from '../theme/ThemeProvider';

interface BannerAdProps {
  config: AdConfig;
  animationConfig?: AdAnimationConfig;
  onStateChange?: (visible: boolean) => void;
}

export const BannerAd: React.FC<BannerAdProps> = ({ config, animationConfig, onStateChange }) => {
  const { state, handleClick, hide, handleError } = useAdLogic({
    config,
    onStateChange: s => onStateChange?.(s.isVisible),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    if (state.isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationConfig?.enterDuration ?? 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationConfig?.exitDuration ?? 300,
        useNativeDriver: true,
      }).start();
    }
  }, [state.isVisible, fadeAnim, scaleAnim, animationConfig]);

  const handlePress = useCallback(async () => {
    if (config.content.ctaUrl) {
      const opened = await openAdUrl(config.content.ctaUrl);
      if (opened) {
        handleClick(config.content.ctaUrl);
      }
    }
  }, [config.content.ctaUrl, handleClick]);

  const size = getAdSize(config.size ?? 'medium', config.customSize);

  if (!state.isVisible) return null;

  return (
    <ThemeProvider theme={config.theme}>
      <Animated.View
        style={[
          styles.container,
          {
            width: size.width,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
          config.styleOverrides?.container,
        ]}
        accessibilityViewIsModal={false}
        accessibilityLabel={config.accessibility?.label || `Advertisement: ${config.content.title}`}
        accessibilityHint={config.accessibility?.hint || 'Double tap to interact with this advertisement'}
        accessibilityRole={config.accessibility?.role || 'button'}
      >
        <Pressable onPress={handlePress} style={styles.pressable}>
          <View style={styles.inner}>
            {config.content.media && (
              <AdMediaContainer
                media={config.content.media}
                style={config.styleOverrides?.mediaContainer}
                aspectRatio={config.size === 'small' ? 6.4 : 16 / 9}
              />
            )}
            <View style={styles.content}>
              <AdHeader content={config.content} showBadge showIcon />
              <AdFooter content={config.content} onCtaPress={handlePress} />
            </View>
          </View>
        </Pressable>

        {config.behavior?.showCloseButton && (
          <Pressable
            onPress={hide}
            style={styles.closeButton}
            accessibilityLabel="Close advertisement"
            accessibilityRole="button"
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <View style={styles.closeIcon}>
              <Text style={styles.closeText}>✕</Text>
            </View>
          </Pressable>
        )}
      </Animated.View>
    </ThemeProvider>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pressable: {
    width: '100%',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});
