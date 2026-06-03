import React from 'react';
import { View, Image, ViewStyle, ImageSourcePropType, StyleProp } from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdIconProps {
  source?: ImageSourcePropType | { uri: string };
  size?: number;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  accessibilityLabel?: string;
}

export const AdIcon: React.FC<AdIconProps> = ({
  source,
  size = 40,
  style,
  borderRadius,
  accessibilityLabel,
}) => {
  const { theme } = useAdTheme();

  if (!source) return null;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: borderRadius ?? theme.borderRadius.md,
          overflow: 'hidden',
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}
    >
      <Image
        source={source as ImageSourcePropType}
        style={{ width: size, height: size }}
        resizeMode="cover"
        accessibilityLabel={accessibilityLabel || 'Ad icon'}
      />
    </View>
  );
};
