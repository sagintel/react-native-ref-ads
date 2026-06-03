import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  Modal,
  BackHandler,
  StatusBar,
  Dimensions,
} from 'react-native';
import { AdConfig, AdAnimationConfig } from '../types';
import { useAdLogic } from '../hooks/useAdLogic';
import { openAdUrl } from '../utils/linking';
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from '../utils/helpers';
import { AdMediaContainer } from '../molecules/AdMediaContainer';
import { AdHeader } from '../molecules/AdHeader';
import { AdFooter } from '../molecules/AdFooter';
import { AdCountdown } from '../molecules/AdCountdown';
import { ThemeProvider } from '../theme/ThemeProvider';

interface InterstitialAdProps {
  config: AdConfig;
  animationConfig?: AdAnimationConfig;
  onStateChange?: (visible: boolean) => void;
}

export const InterstitialAd: React.FC<InterstitialAdProps> = ({
  config,
  animationConfig,
  onStateChange,
}) => {
  const { state, handleClick, hide, canClose } = useAdLogic({
    config,
    onStateChange: s => onStateChange?.(s.isVisible),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (state.isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationConfig?.enterDuration ?? 400,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationConfig?.exitDuration ?? 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: animationConfig?.exitDuration ?? 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state.isVisible, fadeAnim, slideAnim, animationConfig]);

  useEffect(() => {
    if (config.behavior?.dismissOnBackButton && state.isVisible) {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (canClose) {
          hide();
          return true;
        }
        return false;
      });
      return () => backHandler.remove();
    }
  }, [state.isVisible, canClose, hide, config.behavior?.dismissOnBackButton]);

  const handlePress = useCallback(async () => {
    if (config.content.ctaUrl) {
      const opened = await openAdUrl(config.content.ctaUrl);
      if (opened) {
        handleClick(config.content.ctaUrl);
      }
    }
  }, [config.content.ctaUrl, handleClick]);

  const handleBackdropPress = useCallback(() => {
    if (config.behavior?.dismissOnBackdropPress && canClose) {
      hide();
    }
  }, [config.behavior?.dismissOnBackdropPress, canClose, hide]);

  if (!state.isVisible) return null;

  return (
    <ThemeProvider theme={config.theme}>
      <Modal
        visible={state.isVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => {
          if (canClose) hide();
        }}
      >
        <StatusBar backgroundColor="rgba(0,0,0,0.8)" barStyle="light-content" />
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress} />

          <Animated.View
            style={[
              styles.container,
              {
                transform: [{ translateY: slideAnim }],
              },
              config.styleOverrides?.container,
            ]}
            accessibilityViewIsModal={true}
            accessibilityLabel={config.accessibility?.label || `Interstitial advertisement: ${config.content.title}`}
            accessibilityHint={config.accessibility?.hint || 'Swipe down to dismiss after countdown'}
            accessibilityRole={config.accessibility?.role || 'dialog'}
          >
            {config.behavior?.showCountdown && (
              <AdCountdown
                timeLeft={state.timeLeft}
                progress={state.progress}
                style={styles.countdown}
              />
            )}

            <Pressable onPress={handlePress} style={styles.pressable}>
              <AdMediaContainer
                media={config.content.media}
                style={config.styleOverrides?.mediaContainer}
                aspectRatio={4 / 3}
              />
              <AdHeader content={config.content} showBadge showIcon />
              <AdFooter content={config.content} onCtaPress={handlePress} />
            </Pressable>

            {config.behavior?.showCloseButton && canClose && (
              <Pressable
                onPress={hide}
                style={[styles.closeButton, config.styleOverrides?.closeButton]}
                accessibilityLabel="Close advertisement"
                accessibilityRole="button"
                hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
              >
                <View style={styles.closeIcon}>
                  <Text style={styles.closeText}>✕</Text>
                </View>
              </Pressable>
            )}
          </Animated.View>
        </Animated.View>
      </Modal>
    </ThemeProvider>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: Math.min(SCREEN_WIDTH - 40, 400),
    maxHeight: SCREEN_HEIGHT * 0.85,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  countdown: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  pressable: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});
