import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdDescriptionProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  accessibilityLabel?: string;
}

export const AdDescription: React.FC<AdDescriptionProps> = ({
  text,
  style,
  numberOfLines = 3,
  accessibilityLabel,
}) => {
  const { theme } = useAdTheme();

  if (!text) return null;

  return (
    <Text
      style={[theme.fonts.body, style]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel || text}
      accessibilityRole="text"
    >
      {text}
    </Text>
  );
};
