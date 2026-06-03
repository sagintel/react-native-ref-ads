# Quick Start Reference

## Installation

```bash
npx expo install react-native-flex-ads expo-image expo-av expo-linking react-native-gesture-handler
```

## Basic Usage

```tsx
import { BannerAd, AdConfig } from 'react-native-flex-ads';

const config: AdConfig = {
  id: 'ad-1',
  type: 'banner',
  content: {
    title: 'My Ad',
    ctaText: 'Open',
    ctaUrl: 'https://example.com',
    media: { uri: 'https://example.com/image.jpg', type: 'image' },
    badge: 'Ad',
  },
};

<BannerAd config={config} />
```

## Ad Types

| Type | Component | Use Case |
|------|-----------|----------|
| Banner | `<BannerAd />` | Bottom of screen, feeds |
| Interstitial | `<InterstitialAd />` | Level complete, transitions |
| Reward | `<RewardAd />` | Free coins, premium unlock |
| Native | `<NativeAd />` | Social feed, content stream |
| Inline | `<InlineAd />` | Compact text areas |

## Key Props

- `config.content` — Text, images, videos, CTA
- `config.behavior` — Timing, close buttons, auto-close
- `config.callbacks` — onShow, onClick, onReward, onClose
- `config.theme` — Override colors, fonts, spacing
- `config.styleOverrides` — Override any component style

## Testing

```bash
npm test
npm run lint
npm run typecheck
```

## Publishing

```bash
npm version patch   # or minor/major
npm publish --access public
```
