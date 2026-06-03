# react-native-ref-ads

> Highly flexible, customizable React Native ad components for Expo. Build native-feeling ads with full UI control — no WebView limitations.

[![npm version](https://badge.fury.io/js/react-native-ref-ads.svg)](https://badge.fury.io/js/react-native-ref-ads)
[![CI](https://github.com/sagintel/react-native-ref-ads/actions/workflows/ci.yml/badge.svg)](https://github.com/sagintel/react-native-ref-ads/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Fully Customizable UI** — Every pixel is yours. No pre-made SDK constraints.
- 📱 **Native Performance** — Uses `expo-image` and `expo-av` for hardware-accelerated media.
- 🧩 **Atomic Design Architecture** — Atoms → Molecules → Organisms for maximum reusability.
- 🎬 **Rich Media Support** — Images, videos, carousels, icons, and badges.
- ⏱️ **Smart Timing** — Countdowns, auto-close, impression tracking, min-view-time.
- 🎁 **Reward Ads** — Built-in reward system with callbacks.
- 🌗 **Dark Mode Ready** — Theme provider with full override support.
- ♿ **Accessibility First** — Screen reader support, proper roles, hints, and labels.
- 🏗️ **TypeScript** — Strictly typed for excellent DX.
- 🧪 **Tested** — Unit & component tests with Jest + React Native Testing Library.
- 📦 **Expo & Bare React Native** — Works in managed workflows and bare projects.
- 🍎 **App Store / Play Store Compliant** — Follows platform ad guidelines.

## 📦 Installation

```bash
npx expo install react-native-flex-ads expo-image expo-av expo-linking react-native-gesture-handler
```

> **Note:** This package requires Expo SDK 50+ and React Native 0.73+.

## 🚀 Quick Start

```tsx
import { BannerAd, AdConfig } from 'react-native-flex-ads';

const config: AdConfig = {
  id: 'my-ad-1',
  type: 'banner',
  content: {
    title: 'Premium App',
    description: 'Get the best experience today.',
    ctaText: 'Download',
    ctaUrl: 'https://apps.apple.com/app/id123456789',
    media: { uri: 'https://example.com/ad.jpg', type: 'image' },
    badge: 'Ad',
  },
  behavior: {
    autoShow: true,
    showCloseButton: true,
    showCountdown: false,
  },
};

export default function App() {
  return <BannerAd config={config} />;
}
```

## 🧩 Components

### Organisms (Full Ad Units)

| Component | Description | Best For |
|-----------|-------------|----------|
| `BannerAd` | Compact horizontal or vertical banner | Feed, lists, bottom of screen |
| `InterstitialAd` | Full-screen modal overlay | Natural break points, transitions |
| `RewardAd` | Full-screen with reward banner | Incentivized actions, currency |
| `NativeAd` | Content-matching card layout | Social feeds, content streams |
| `InlineAd` | Minimal row-based layout | Text-heavy screens, compact spaces |

### Molecules (Composites)

- `AdMediaContainer` — Unified image/video wrapper
- `AdHeader` — Icon + title + subtitle + badge
- `AdFooter` — Description + CTA button
- `AdCountdown` — Timer with progress bar
- `AdControls` — Video play/pause/mute controls

### Atoms (Primitives)

- `AdTitle`, `AdSubtitle`, `AdDescription`
- `AdBadge`, `AdButton`, `AdIcon`
- `AdImage` (expo-image), `AdVideo` (expo-av)

## 🎨 Theming

```tsx
import { ThemeProvider, defaultTheme } from 'react-native-flex-ads';

const darkTheme = {
  colors: {
    ...defaultTheme.colors,
    background: '#1C1C1E',
    text: '#FFFFFF',
  },
};

<ThemeProvider theme={darkTheme}>
  <BannerAd config={config} />
</ThemeProvider>
```

## 🪝 Hooks

```tsx
import { useAdLogic, useAdTimer, useAdVisibility, useAdMedia } from 'react-native-flex-ads';
```

- `useAdLogic` — Full state machine for any ad type
- `useAdTimer` — Countdown with pause/resume/reset
- `useAdVisibility` — Viewability tracking for impressions
- `useAdMedia` — Multi-media carousel management

## 📋 App Store & Play Store Compliance

This package helps you comply with platform ad policies:

### Apple App Store
- ✅ Close buttons are clearly visible and tappable
- ✅ Ads are clearly distinguishable from app content (`badge: 'Ad'`)
- ✅ No deceptive practices — all interactions are explicit
- ✅ Proper accessibility labels for VoiceOver
- ✅ Reward ads clearly state the reward before viewing

### Google Play Store
- ✅ Ads do not interfere with app navigation
- ✅ Close buttons meet minimum 48dp touch target
- ✅ Interstitial ads have frequency caps via `autoCloseDelay`
- ✅ No unexpected ad displays — all ads are prop-driven
- ✅ Proper content labeling via `sponsoredLabel`

## 🧪 Testing

```bash
npm test           # Run unit tests
npm run test:watch # Watch mode
npm run test:ci    # CI with coverage
```

## 🏗️ Development

```bash
git clone https://github.com/sagintel/react-native-ref-ads.git
cd react-native-ref-ads
npm install
npm run build
```

### Example App

```bash
cd example
npm install
npx expo start
```

## 📄 License

MIT © [Your Name](https://github.com/yourusername)
