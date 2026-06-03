import React from 'react';
import { View, Pressable, Text, ViewStyle, StyleProp } from 'react-native';
import { useAdTheme } from '../theme/ThemeProvider';

interface AdControlsProps {
  isMuted: boolean;
  onMuteToggle: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AdControls: React.FC<AdControlsProps> = ({
  isMuted,
  onMuteToggle,
  isPlaying,
  onPlayPause,
  style,
}) => {
  const { theme } = useAdTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: theme.spacing.sm,
          gap: theme.spacing.sm,
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPlayPause}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
        accessibilityRole="button"
      >
        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
      </Pressable>
      <Pressable
        onPress={onMuteToggle}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        accessibilityLabel={isMuted ? 'Unmute video' : 'Mute video'}
        accessibilityRole="button"
      >
        <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>
          {isMuted ? '🔇' : '🔊'}
        </Text>
      </Pressable>
    </View>
  );
};
