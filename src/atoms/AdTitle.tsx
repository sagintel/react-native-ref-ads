import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdTitleProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  accessibilityLabel?: string;
}

export const AdTitle: React.FC<AdTitleProps> = ({
  text,
  style,
  numberOfLines = 2,
  accessibilityLabel,
}) => {
  const { theme } = useAdTheme();

  if (!text) return null;

  return (
    <Text
      style={[theme.fonts.title, style]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel || text}
      accessibilityRole="header"
    >
      {text}
    </Text>
  );
};
