import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdBadgeProps {
  text?: string;
  style?: StyleProp<ViewStyle & TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const AdBadge: React.FC<AdBadgeProps> = ({ text, style, textStyle }) => {
  const { theme } = useAdTheme();

  if (!text) return null;

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.warning,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.sm,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            ...theme.fonts.caption,
            color: '#FFFFFF',
            fontWeight: '700',
          },
          textStyle,
        ]}
      >
        {text.toUpperCase()}
      </Text>
    </View>
  );
};
