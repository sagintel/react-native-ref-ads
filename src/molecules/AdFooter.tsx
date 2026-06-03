import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { AdContent } from '../types';
import { AdButton } from '../atoms/AdButton';
import { AdDescription } from '../atoms/AdDescription';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdFooterProps {
  content: AdContent;
  style?: StyleProp<ViewStyle>;
  onCtaPress?: () => void;
}

export const AdFooter: React.FC<AdFooterProps> = ({ content, style, onCtaPress }) => {
  const { theme } = useAdTheme();

  return (
    <View
      style={[
        {
          padding: theme.spacing.md,
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      <AdDescription text={content.description} />
      {content.ctaText && (
        <AdButton
          text={content.ctaText}
          onPress={onCtaPress}
          accessibilityLabel={content.ctaText}
          accessibilityHint="Opens advertiser website"
        />
      )}
    </View>
  );
};
