import { Dimensions, Platform, StatusBar } from 'react-native';
import { AdSize, AdPosition, AdConfig } from '../types';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export const STATUSBAR_HEIGHT = isIOS ? 44 : StatusBar.currentHeight || 24;

export function getAdSize(size: AdSize, customSize?: { width?: number | string; height?: number | string }) {
  switch (size) {
    case 'small':
      return { width: 320, height: 50 };
    case 'medium':
      return { width: 320, height: 250 };
    case 'large':
      return { width: 360, height: 400 };
    case 'fullscreen':
      return { width: SCREEN_WIDTH, height: SCREEN_HEIGHT };
    case 'custom':
      return {
        width: customSize?.width ?? SCREEN_WIDTH,
        height: customSize?.height ?? 250,
      };
    default:
      return { width: 320, height: 250 };
  }
}

export function getAdPositionStyle(position: AdPosition) {
  switch (position) {
    case 'top':
      return { top: STATUSBAR_HEIGHT, left: 0, right: 0 };
    case 'bottom':
      return { bottom: 0, left: 0, right: 0 };
    case 'center':
      return {
        top: SCREEN_HEIGHT / 2 - 150,
        left: SCREEN_WIDTH / 2 - 160,
      };
    case 'fullscreen':
      return { top: 0, left: 0, right: 0, bottom: 0 };
    default:
      return { bottom: 0, left: 0, right: 0 };
  }
}

export function validateAdConfig(config: AdConfig): string[] {
  const errors: string[] = [];

  if (!config.id) {
    errors.push('Ad config must have an id');
  }

  if (!config.content) {
    errors.push('Ad config must have content');
  }

  if (config.behavior?.autoCloseDelay && config.behavior.autoCloseDelay < 1000) {
    errors.push('autoCloseDelay must be at least 1000ms');
  }

  if (config.behavior?.countdownDuration && config.behavior.countdownDuration < 1000) {
    errors.push('countdownDuration must be at least 1000ms');
  }

  if (config.behavior?.closeButtonDelay && config.behavior.closeButtonDelay < 0) {
    errors.push('closeButtonDelay cannot be negative');
  }

  return errors;
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle = false;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

export function formatTimeLeft(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  return `${seconds}s`;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function mergeThemes(base: typeof import('./constants').defaultTheme, override?: Partial<typeof import('./constants').defaultTheme>) {
  if (!override) return base;
  return {
    ...base,
    colors: { ...base.colors, ...override.colors },
    fonts: { ...base.fonts, ...override.fonts },
    spacing: { ...base.spacing, ...override.spacing },
    borderRadius: { ...base.borderRadius, ...override.borderRadius },
    shadows: { ...base.shadows, ...override.shadows },
  };
}
