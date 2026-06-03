import { Animated, Easing } from 'react-native';
import { AdAnimationConfig } from '../types';

export function createEnterAnimation(
  config: AdAnimationConfig = {},
  value: Animated.Value = new Animated.Value(0)
): { value: Animated.Value; animate: () => Animated.CompositeAnimation } {
  const { enterDuration = 400, enterType = 'fade', slideDirection = 'up', scaleFrom = 0.8 } = config;

  const animate = () => {
    value.setValue(0);

    switch (enterType) {
      case 'fade':
        return Animated.timing(value, {
          toValue: 1,
          duration: enterDuration,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        });
      case 'slide': {
        const translateY = slideDirection === 'up' ? 100 : slideDirection === 'down' ? -100 : 0;
        const translateX = slideDirection === 'left' ? 100 : slideDirection === 'right' ? -100 : 0;
        return Animated.parallel([
          Animated.timing(value, {
            toValue: 1,
            duration: enterDuration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(new Animated.Value(translateY), {
            toValue: 0,
            duration: enterDuration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]);
      }
      case 'scale':
        return Animated.timing(value, {
          toValue: 1,
          duration: enterDuration,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        });
      default:
        return Animated.timing(value, { toValue: 1, duration: 0, useNativeDriver: true });
    }
  };

  return { value, animate };
}

export function createExitAnimation(
  config: AdAnimationConfig = {},
  value: Animated.Value = new Animated.Value(1)
): { value: Animated.Value; animate: () => Animated.CompositeAnimation } {
  const { exitDuration = 300, exitType = 'fade', slideDirection = 'down' } = config;

  const animate = () => {
    switch (exitType) {
      case 'fade':
        return Animated.timing(value, {
          toValue: 0,
          duration: exitDuration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        });
      case 'slide': {
        const translateY = slideDirection === 'up' ? -100 : slideDirection === 'down' ? 100 : 0;
        const translateX = slideDirection === 'left' ? -100 : slideDirection === 'right' ? 100 : 0;
        return Animated.parallel([
          Animated.timing(value, {
            toValue: 0,
            duration: exitDuration,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(new Animated.Value(0), {
            toValue: translateY || translateX,
            duration: exitDuration,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]);
      }
      case 'scale':
        return Animated.timing(value, {
          toValue: 0,
          duration: exitDuration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        });
      default:
        return Animated.timing(value, { toValue: 0, duration: 0, useNativeDriver: true });
    }
  };

  return { value, animate };
}

export function createPulseAnimation(value: Animated.Value = new Animated.Value(1)): Animated.CompositeAnimation {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1.05,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  );
}

export function createShakeAnimation(value: Animated.Value = new Animated.Value(0)): Animated.CompositeAnimation {
  return Animated.sequence([
    Animated.timing(value, { toValue: -10, duration: 100, useNativeDriver: true }),
    Animated.timing(value, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(value, { toValue: -10, duration: 100, useNativeDriver: true }),
    Animated.timing(value, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(value, { toValue: 0, duration: 100, useNativeDriver: true }),
  ]);
}

export function interpolateOpacity(value: Animated.Value, inputRange: number[] = [0, 1], outputRange: number[] = [0, 1]) {
  return value.interpolate({ inputRange, outputRange, extrapolate: 'clamp' });
}

export function interpolateScale(value: Animated.Value, inputRange: number[] = [0, 1], outputRange: number[] = [0.8, 1]) {
  return value.interpolate({ inputRange, outputRange, extrapolate: 'clamp' });
}
