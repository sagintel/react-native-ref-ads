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
} from 'react-native';
import { AdConfig, AdAnimationConfig } from '../types';
import { useAdLogic } from '../hooks/useAdLogic';
import { openAdUrl } from '../utils/linking';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/helpers';
import { AdMediaContainer } from '../molecules/AdMediaContainer';
import { AdHeader } from '../molecules/AdHeader';
import { AdFooter } from '../molecules/AdFooter';
import { AdCountdown } from '../molecules/AdCountdown';
import { ThemeProvider } from '../theme/ThemeProvider';

interface RewardAdProps {
  config: AdConfig;
  animationConfig?: AdAnimationConfig;
  onStateChange?: (visible: boolean) => void;
  onRewardReady?: () => void;
}

export const RewardAd: React.FC<RewardAdProps> = ({
  config,
  animationConfig,
  onStateChange,
  onRewardReady,
}) => {
  const { state, handleClick, hide, handleReward, canClose } = useAdLogic({
    config,
    onStateChange: s => {
      onStateChange?.(s.isVisible);
      if (s.hasRewarded) {
        onRewardReady?.();
      }
    },
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (state.isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationConfig?.enterDuration ?? 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
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
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: animationConfig?.exitDuration ?? 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state.isVisible, fadeAnim, scaleAnim, animationConfig]);

  useEffect(() => {
    if (state.progress >= 1 && !state.hasRewarded) {
      handleReward();
    }
  }, [state.progress, state.hasRewarded, handleReward]);

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
        if (config.behavior?.rewardOnClick) {
          handleReward();
        }
      }
    }
  }, [config.content.ctaUrl, config.behavior?.rewardOnClick, handleClick, handleReward]);

  const handleBackdropPress = useCallback(() => {
    if (config.behavior?.dismissOnBackdropPress && canClose) {
      hide();
    }
  }, [config.behavior?.dismissOnBackdropPress, canClose, hide]);

  if (!state.isVisible) return null;

  const rewardText = state.hasRewarded ? 'Reward Earned! ✓' : 'Watch to earn reward...';

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
        <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress} />

          <Animated.View
            style={[
              styles.container,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
              config.styleOverrides?.container,
            ]}
            accessibilityViewIsModal={true}
            accessibilityLabel={`Reward advertisement: ${config.content.title}`}
            accessibilityHint="Watch the full advertisement to earn your reward"
            accessibilityRole="dialog"
          >
            <View style={styles.rewardBanner}>
              <Text style={styles.rewardText}>{rewardText}</Text>
            </View>

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
                aspectRatio={16 / 9}
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
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: Math.min(SCREEN_WIDTH - 40, 420),
    maxHeight: SCREEN_HEIGHT * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
      },
      android: {
        elevation: 24,
      },
    }),
  },
  rewardBanner: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  rewardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
    top: 52,
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
