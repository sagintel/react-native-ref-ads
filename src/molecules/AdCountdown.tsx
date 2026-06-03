import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdCountdownProps {
  timeLeft: number;
  progress: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  showProgressBar?: boolean;
}

export const AdCountdown: React.FC<AdCountdownProps> = ({
  timeLeft,
  progress,
  style,
  textStyle,
  showProgressBar = true,
}) => {
  const { theme } = useAdTheme();
  const seconds = Math.ceil(timeLeft / 1000);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            ...theme.fonts.caption,
            color: theme.colors.textSecondary,
            fontVariant: ['tabular-nums'],
          },
          textStyle,
        ]}
        accessibilityLabel={`${seconds} seconds remaining`}
      >
        {seconds}s
      </Text>
      {showProgressBar && (
        <View
          style={{
            flex: 1,
            height: 4,
            backgroundColor: theme.colors.border,
            borderRadius: theme.borderRadius.full,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.full,
            }}
          />
        </View>
      )}
    </View>
  );
};
