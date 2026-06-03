import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Button,
  Switch,
  Platform,
} from 'react-native';
import {
  BannerAd,
  InterstitialAd,
  RewardAd,
  NativeAd,
  InlineAd,
  ThemeProvider,
  AdConfig,
  defaultTheme,
} from 'react-native-flex-ads';

const DEMO_CONTENT = {
  title: 'Premium Fitness App',
  subtitle: 'Get Fit Today',
  description:
    'Transform your body with personalized workouts, nutrition plans, and expert coaching. Start your 7-day free trial now!',
  badge: 'Ad',
  ctaText: 'Start Free Trial',
  ctaUrl: 'https://apps.apple.com',
  icon: { uri: 'https://via.placeholder.com/100/007AFF/FFFFFF?text=FIT' },
  media: {
    uri: 'https://via.placeholder.com/800x450/34C759/FFFFFF?text=Workout',
    type: 'image' as const,
  },
  sponsoredLabel: 'Sponsored',
  advertiser: 'FitLife Inc.',
};

const DARK_THEME = {
  colors: {
    ...defaultTheme.colors,
    background: '#1C1C1E',
    surface: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
  },
};

export default function App() {
  const [showBanner, setShowBanner] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showNative, setShowNative] = useState(false);
  const [showInline, setShowInline] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(false);

  const baseConfig: Omit<AdConfig, 'id' | 'type'> = {
    content: DEMO_CONTENT,
    behavior: {
      showCloseButton: true,
      closeButtonDelay: 2000,
      showCountdown: true,
      countdownDuration: 5000,
      autoCloseDelay: 20000,
      dismissOnBackdropPress: true,
      dismissOnBackButton: true,
    },
    callbacks: {
      onShow: () => console.log('Ad shown'),
      onHide: () => console.log('Ad hidden'),
      onClick: (url) => console.log('Ad clicked:', url),
      onClose: () => console.log('Ad closed'),
      onImpression: () => console.log('Ad impression'),
      onError: (err) => console.error('Ad error:', err),
    },
    theme: isDarkMode ? DARK_THEME : undefined,
  };

  const bannerConfig: AdConfig = {
    ...baseConfig,
    id: 'demo-banner-1',
    type: 'banner',
    size: 'medium',
    position: 'bottom',
  };

  const interstitialConfig: AdConfig = {
    ...baseConfig,
    id: 'demo-interstitial-1',
    type: 'interstitial',
    position: 'center',
    behavior: {
      ...baseConfig.behavior,
      autoShow: false,
    },
  };

  const rewardConfig: AdConfig = {
    ...baseConfig,
    id: 'demo-reward-1',
    type: 'reward',
    behavior: {
      ...baseConfig.behavior,
      rewardOnComplete: true,
      countdownDuration: 5000,
    },
    callbacks: {
      ...baseConfig.callbacks,
      onReward: () => {
        console.log('Reward earned!');
        setRewardEarned(true);
      },
    },
  };

  const nativeConfig: AdConfig = {
    ...baseConfig,
    id: 'demo-native-1',
    type: 'native',
  };

  const inlineConfig: AdConfig = {
    ...baseConfig,
    id: 'demo-inline-1',
    type: 'inline',
    content: {
      ...DEMO_CONTENT,
      description: 'Short inline ad description',
    },
  };

  return (
    <ThemeProvider theme={isDarkMode ? DARK_THEME : undefined}>
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
              react-native-flex-ads
            </Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkTextSecondary]}>
              Demo & Test Suite
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={[styles.label, isDarkMode && styles.darkText]}>Dark Mode</Text>
              <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Banner Ad
            </Text>
            <Button title={showBanner ? 'Hide Banner' : 'Show Banner'} onPress={() => setShowBanner(!showBanner)} />
            {showBanner && (
              <BannerAd
                config={bannerConfig}
                onStateChange={(visible) => console.log('Banner visible:', visible)}
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Interstitial Ad
            </Text>
            <Button
              title="Show Interstitial"
              onPress={() => setShowInterstitial(true)}
            />
            <InterstitialAd
              config={interstitialConfig}
              onStateChange={(visible) => {
                if (!visible) setShowInterstitial(false);
              }}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Reward Ad
            </Text>
            <Button title="Show Reward Ad" onPress={() => {
              setRewardEarned(false);
              setShowReward(true);
            }} />
            {rewardEarned && (
              <Text style={[styles.rewardText, isDarkMode && styles.darkText]}>
                🎉 Reward Earned!
              </Text>
            )}
            <RewardAd
              config={rewardConfig}
              onStateChange={(visible) => {
                if (!visible) setShowReward(false);
              }}
              onRewardReady={() => console.log('Reward ready callback')}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Native Ad
            </Text>
            <Button title={showNative ? 'Hide Native' : 'Show Native'} onPress={() => setShowNative(!showNative)} />
            {showNative && <NativeAd config={nativeConfig} />}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Inline Ad
            </Text>
            <Button title={showInline ? 'Hide Inline' : 'Show Inline'} onPress={() => setShowInline(!showInline)} />
            {showInline && <InlineAd config={inlineConfig} />}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Platform Info
            </Text>
            <Text style={[styles.info, isDarkMode && styles.darkTextSecondary]}>
              OS: {Platform.OS}{'
'}
              Version: {Platform.Version}{'
'}
              Dark Mode: {isDarkMode ? 'On' : 'Off'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 16,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  info: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 22,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#34C759',
    textAlign: 'center',
    marginTop: 8,
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkTextSecondary: {
    color: '#8E8E93',
  },
});
