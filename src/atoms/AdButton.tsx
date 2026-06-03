import React, { useState } from 'react';
import {
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  Animated,
  Platform,
} from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdButtonProps {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle & TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const AdButton: React.FC<AdButtonProps> = ({
  text,
  onPress,
  style,
  textStyle,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const { theme } = useAdTheme();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  if (!text) return null;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel || text}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          {
            backgroundColor: disabled ? theme.colors.textSecondary : theme.colors.primary,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 1,
            ...Platform.select({
              ios: theme.shadows.sm,
              android: { elevation: 2 },
            }),
          },
          style,
        ]}
      >
        <Text style={[theme.fonts.button, textStyle]}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};
