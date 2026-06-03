import { ImageSourcePropType, ViewStyle, TextStyle, PressableProps } from 'react-native';
import { ResizeMode } from 'expo-av';

// ============================================================================
// AD MEDIA
// ============================================================================

export type AdMediaType = 'image' | 'video';

export interface AdMediaSource {
  uri: string;
  type: AdMediaType;
  resizeMode?: ResizeMode;
  duration?: number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export interface AdImageProps {
  source: ImageSourcePropType | { uri: string };
  style?: ViewStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: (error: Error) => void;
  accessibilityLabel?: string;
}

export interface AdVideoProps {
  source: { uri: string } | number;
  style?: ViewStyle;
  resizeMode?: ResizeMode;
  shouldPlay?: boolean;
  isLooping?: boolean;
  isMuted?: boolean;
  volume?: number;
  onPlaybackStatusUpdate?: (status: VideoPlaybackStatus) => void;
  onReadyForDisplay?: () => void;
  onError?: (error: Error) => void;
  accessibilityLabel?: string;
}

export interface VideoPlaybackStatus {
  isLoaded: boolean;
  isPlaying?: boolean;
  durationMillis?: number;
  positionMillis?: number;
  didJustFinish?: boolean;
}

// ============================================================================
// AD CONTENT
// ============================================================================

export interface AdContent {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  ctaText?: string;
  ctaUrl?: string;
  icon?: ImageSourcePropType | { uri: string };
  media?: AdMediaSource | AdMediaSource[];
  rating?: number;
  advertiser?: string;
  sponsoredLabel?: string;
}

// ============================================================================
// AD STYLES
// ============================================================================

export interface AdTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    overlay: string;
    error: string;
    success: string;
    warning: string;
  };
  fonts: {
    title: TextStyle;
    subtitle: TextStyle;
    body: TextStyle;
    caption: TextStyle;
    button: TextStyle;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
  };
}

export interface AdStyleOverrides {
  container?: ViewStyle;
  mediaContainer?: ViewStyle;
  contentContainer?: ViewStyle;
  title?: TextStyle;
  subtitle?: TextStyle;
  description?: TextStyle;
  badge?: ViewStyle & TextStyle;
  ctaButton?: ViewStyle & TextStyle;
  closeButton?: ViewStyle;
  countdown?: ViewStyle & TextStyle;
  icon?: ViewStyle;
  overlay?: ViewStyle;
}

// ============================================================================
// AD BEHAVIOR
// ============================================================================

export type AdType = 'banner' | 'interstitial' | 'reward' | 'native' | 'inline';

export type AdPosition = 'top' | 'bottom' | 'center' | 'fullscreen';

export type AdSize = 'small' | 'medium' | 'large' | 'fullscreen' | 'custom';

export interface AdBehavior {
  autoShow?: boolean;
  autoCloseDelay?: number;
  showCloseButton?: boolean;
  closeButtonDelay?: number;
  countdownDuration?: number;
  showCountdown?: boolean;
  draggable?: boolean;
  dismissOnDrag?: boolean;
  dismissOnBackdropPress?: boolean;
  dismissOnBackButton?: boolean;
  trackImpression?: boolean;
  trackClick?: boolean;
  rewardOnComplete?: boolean;
  rewardOnClick?: boolean;
  impressionThreshold?: number;
  minViewTime?: number;
}

export interface AdCallbacks {
  onLoad?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onClick?: (url?: string) => void;
  onClose?: () => void;
  onError?: (error: Error) => void;
  onImpression?: () => void;
  onReward?: (rewardType?: string) => void;
  onCountdownComplete?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onVideoComplete?: () => void;
  onVideoStart?: () => void;
}

// ============================================================================
// AD CONFIG
// ============================================================================

export interface AdConfig {
  id: string;
  type: AdType;
  content: AdContent;
  behavior?: AdBehavior;
  callbacks?: AdCallbacks;
  styleOverrides?: AdStyleOverrides;
  theme?: Partial<AdTheme>;
  position?: AdPosition;
  size?: AdSize;
  customSize?: { width?: number; height?: number };
  testMode?: boolean;
  platform?: 'ios' | 'android' | 'all';
  orientation?: 'portrait' | 'landscape' | 'all';
  accessibility?: {
    label?: string;
    hint?: string;
    role?: 'button' | 'link' | 'image' | 'header' | 'text';
  };
}

// ============================================================================
// AD STATE
// ============================================================================

export type AdStatus = 'idle' | 'loading' | 'ready' | 'showing' | 'paused' | 'completed' | 'closed' | 'error';

export interface AdState {
  status: AdStatus;
  isVisible: boolean;
  timeLeft: number;
  progress: number;
  isPlaying: boolean;
  isMuted: boolean;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
  hasImpression: boolean;
  hasClicked: boolean;
  hasRewarded: boolean;
  error?: Error;
}

// ============================================================================
// GESTURE & ANIMATION
// ============================================================================

export interface AdAnimationConfig {
  enterDuration?: number;
  exitDuration?: number;
  enterType?: 'fade' | 'slide' | 'scale' | 'none';
  exitType?: 'fade' | 'slide' | 'scale' | 'none';
  slideDirection?: 'up' | 'down' | 'left' | 'right';
  scaleFrom?: number;
  scaleTo?: number;
}

export interface AdGestureConfig {
  enabled?: boolean;
  dismissOnSwipe?: boolean;
  swipeThreshold?: number;
  swipeVelocity?: number;
  snapToEdges?: boolean;
}
