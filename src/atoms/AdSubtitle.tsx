import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdSubtitleProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  accessibilityLabel?: string;
}

export const AdSubtitle: React.FC<AdSubtitleProps> = ({
  text,
  style,
  numberOfLines = 1,
  accessibilityLabel,
}) => {
  const { theme } = useAdTheme();

  if (!text) return null;

  return (
    <Text
      style={[theme.fonts.subtitle, style]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel || text}
      accessibilityRole="text"
    >
      {text}
    </Text>
  );
};
