import React from 'react';
import { View, ViewStyle, StyleProp, Text } from 'react-native';
import { AdContent } from '../types';
import { AdIcon } from '../atoms/AdIcon';
import { AdTitle } from '../atoms/AdTitle';
import { AdSubtitle } from '../atoms/AdSubtitle';
import { AdBadge } from '../atoms/AdBadge';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdHeaderProps {
  content: AdContent;
  style?: StyleProp<ViewStyle>;
  showBadge?: boolean;
  showIcon?: boolean;
}

export const AdHeader: React.FC<AdHeaderProps> = ({
  content,
  style,
  showBadge = true,
  showIcon = true,
}) => {
  const { theme } = useAdTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.md,
          gap: theme.spacing.md,
        },
        style,
      ]}
    >
      {showIcon && content.icon && <AdIcon source={content.icon} size={44} />}
      <View style={{ flex: 1, gap: theme.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
          <AdTitle text={content.title} style={{ flex: 1 }} />
          {showBadge && content.badge && <AdBadge text={content.badge} />}
        </View>
        <AdSubtitle text={content.subtitle || content.advertiser} />
        {content.sponsoredLabel && (
          <Text style={[theme.fonts.caption, { color: theme.colors.textSecondary }]}>
            {content.sponsoredLabel}
          </Text>
        )}
      </View>
    </View>
  );
};
