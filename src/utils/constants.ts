import { AdTheme } from '../types';

export const DEFAULT_AD_TIMEOUT = 30000;
export const DEFAULT_COUNTDOWN_DURATION = 5000;
export const DEFAULT_CLOSE_BUTTON_DELAY = 3000;
export const DEFAULT_IMPRESSION_THRESHOLD = 0.5;
export const DEFAULT_MIN_VIEW_TIME = 1000;
export const DEFAULT_AUTO_CLOSE_DELAY = 15000;

export const AD_SIZES = {
  small: { width: 320, height: 50 },
  medium: { width: 320, height: 250 },
  large: { width: 360, height: 400 },
  fullscreen: { width: '100%', height: '100%' },
};

export const defaultTheme: AdTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#E5E5EA',
    overlay: 'rgba(0, 0, 0, 0.5)',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  fonts: {
    title: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 24,
      color: '#000000',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      color: '#8E8E93',
    },
    body: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: '#3C3C43',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: '#8E8E93',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
      color: '#FFFFFF',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export const TEST_AD_CONTENT = {
  title: 'Test Ad',
  subtitle: 'This is a test advertisement',
  description: 'Experience the best with our premium features. Download now and get started!',
  badge: 'Ad',
  ctaText: 'Learn More',
  ctaUrl: 'https://example.com',
  sponsoredLabel: 'Sponsored',
};
