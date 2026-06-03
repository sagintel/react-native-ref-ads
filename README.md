# react-native-ref-ads

> Highly flexible, customizable React Native ad components for Expo. Build native-feeling ads with full UI control — no WebView limitations.

[![npm version](https://badge.fury.io/js/react-native-ref-ads.svg)](https://badge.fury.io/js/react-native-ref-ads)
[![CI](https://github.com/sagintel/react-native-ref-ads/actions/workflows/ci.yml/badge.svg)](https://github.com/sagintel/react-native-ref-ads/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 What is react-native-ref-ads?

**react-native-ref-ads** is a React Native component library that gives you **full ownership** of the ad UI in your mobile app. Instead of relying on third-party ad SDK black-boxes (AdMob, Meta Audience Network, etc.) that force pre-baked, unalterable layouts rendered inside WebViews, this library provides a set of **native, composable, themeable components** — banners, interstitials, rewarded ads, native cards, and inline units — that you wire up to *your own* ad data however you want.

Think of it as a **design system for ads and referral links**. You bring the content (images, videos, copy, CTA links, referral URLs) from any source — your own ad server, a direct brand deal, a house ad campaign, an affiliate/referral program, or a third-party demand-side platform — and the library handles rendering, timing, impression tracking, click tracking, reward logic, animations, accessibility, and App Store / Play Store compliance.

> **💡 Referral & affiliate links are a first-class use case.** If you want users to tap a beautifully designed banner or card that opens a referral link (e.g. `https://app.com/invite?ref=USER123`), this package gives you the component, the click tracking, and the reward callback — all in native UI that matches your app.

---

## 🤔 Why use this instead of AdMob / traditional ad SDKs?

Traditional ad SDKs come with hard trade-offs:

| | Traditional Ad SDKs (AdMob, etc.) | react-native-ref-ads |
|---|---|---|
| **UI control** | ❌ Black-box WebView; you get what the SDK gives you | ✅ Every pixel is a React Native component you can style |
| **Brand consistency** | ❌ Ads look foreign and break your app's design | ✅ Ads match your theme (colors, fonts, border radius, dark mode) |
| **Revenue source lock-in** | ❌ Tied to one ad network's demand | ✅ Feed it content from *any* source — your own server, direct deals, house ads |
| **Privacy & data** | ❌ SDK collects user data, requires ATT prompts | ✅ No tracking — you choose what data flows where |
| **App Store review risk** | ❌ SDK updates can introduce policy violations you don't control | ✅ Pure React Native components — nothing to audit but your own code |
| **Performance** | ❌ WebView rendering, SDK bloat, cold-start latency | ✅ Native `expo-image` + `expo-av`, hardware-accelerated |

### When this library is a great fit

- **You run your own ad server** or get ad content via a direct API (e.g. from brand partners or your backend).
- **You want house ads** — promoting your own products, features, or premium tier inside your app.
- **You have a referral / affiliate program** — show beautifully designed referral banners or cards with unique user links (`?ref=USER123`), track clicks, and reward users when their friends sign up.
- **You need ads that look native** — social-feed-style promoted cards, in-content recommendations, themed banners that don't scream "THIS IS AN AD".
- **You're building a white-label app** where each client needs ads in their own brand colors/fonts.
- **You want full control** over impression tracking, click tracking, reward logic, and analytics without a third-party SDK's opinion on how things should work.

---

## 🔧 Practical Example — Real-World Scenario

**Scenario:** You have a fitness app with a social feed. A supplement brand pays you directly to show a promoted card in the feed. You want the ad to look *exactly* like a regular feed post — same card style, same fonts, same dark mode — but with a subtle "Sponsored" badge and a CTA button. You also want to track when the user actually *sees* the ad (impression) and when they tap through.

Here's how you do it with **react-native-ref-ads**:

```tsx
import React from 'react';
import { FlatList, View } from 'react-native';
import {
  NativeAd,
  ThemeProvider,
  AdConfig,
  defaultTheme,
} from 'react-native-flex-ads';

// The ad content — fetched from your backend, a brand deal API, or hardcoded for house ads
const sponsoredPost: AdConfig = {
  id: 'supplement-promo-june',
  type: 'native',
  content: {
    title: 'FuelPro Whey Isolate',
    subtitle: 'By FuelPro Nutrition',
    description:
      'Clean protein, zero bloat. 27g protein per scoop with no artificial sweeteners. Used by 50k+ athletes.',
    ctaText: 'Shop Now — 20% Off',
    ctaUrl: 'https://fuelpro.com/whey?ref=myfitnessapp',
    icon: { uri: 'https://cdn.fuelpro.com/logo-round.png' },
    media: {
      uri: 'https://cdn.fuelpro.com/promo-video.mp4',
      type: 'video',
      autoPlay: true,
      muted: true,
      loop: true,
    },
    badge: 'Sponsored',
    advertiser: 'FuelPro Nutrition',
  },
  behavior: {
    autoShow: true,
    showCloseButton: true,
    trackImpression: true,      // fires onImpression when 50%+ is visible for 1s
    trackClick: true,
    impressionThreshold: 0.5,   // 50% of the ad must be on screen
    minViewTime: 1000,          // for at least 1 second
  },
  callbacks: {
    onImpression: () => {
      // Report to your analytics / ad server
      analytics.track('ad_impression', { adId: 'supplement-promo-june' });
    },
    onClick: (url) => {
      analytics.track('ad_click', { adId: 'supplement-promo-june', url });
    },
  },
  // Override just the CTA button to match the brand's green
  styleOverrides: {
    ctaButton: {
      backgroundColor: '#22C55E',
      borderRadius: 12,
    },
  },
};

export default function FeedScreen() {
  const feedItems = useFeedItems(); // your real feed data

  return (
    <ThemeProvider theme={defaultTheme}>
      <FlatList
        data={feedItems}
        renderItem={({ item, index }) => {
          // Inject the sponsored card at position 3 in the feed
          if (index === 3) {
            return (
              <View>
                <FeedCard item={item} />
                <NativeAd config={sponsoredPost} />
              </View>
            );
          }
          return <FeedCard item={item} />;
        }}
      />
    </ThemeProvider>
  );
}
```

**What you get:**
- The ad card uses the same theme (background, text color, border radius, spacing) as every other card in your feed.
- The video auto-plays muted with hardware-accelerated `expo-av` — no WebView jank.
- Impression tracking fires only when the card is actually visible, with configurable thresholds.
- Dark mode? Just swap the theme provider — the ad follows automatically.
- Zero third-party SDKs, zero ATT prompts, zero privacy concerns.

---

## 🔗 Practical Example — Referral Links

**Scenario:** You have a SaaS app and want to grow through referrals. Each user gets a unique referral link (`https://yourapp.com/invite?ref=USER_ID`). You want to show a polished, on-brand banner inside the app that encourages users to share their link — and you want to track every time someone taps it so you can credit the referrer.

With **react-native-ref-ads**, the referral banner is just another ad component — no need to build custom UI from scratch:

```tsx
import React from 'react';
import { BannerAd, AdConfig } from 'react-native-flex-ads';

function ReferralBanner({ userId }: { userId: string }) {
  const referralLink = `https://yourapp.com/invite?ref=${userId}`;

  const referralConfig: AdConfig = {
    id: `referral-banner-${userId}`,
    type: 'banner',
    content: {
      title: 'Give $10, Get $10',
      description:
        'Invite a friend to YourApp. When they sign up, you both get $10 credit — no strings attached.',
      ctaText: 'Share Your Link',
      ctaUrl: referralLink,
      media: {
        uri: 'https://yourapp.com/assets/referral-promo.jpg',
        type: 'image',
      },
      badge: 'Referral',
    },
    behavior: {
      autoShow: true,
      showCloseButton: true,
      trackImpression: true,
      trackClick: true,
    },
    callbacks: {
      onImpression: () => {
        analytics.track('referral_banner_seen', { userId });
      },
      onClick: (url) => {
        // Track the tap, then let the library open the link
        analytics.track('referral_link_tapped', { userId, url });
        // Or trigger the native share sheet instead:
        // Share.share({ message: `Join me on YourApp! ${url}` });
      },
    },
    styleOverrides: {
      ctaButton: {
        backgroundColor: '#6366F1',
        borderRadius: 999,
      },
      badge: {
        backgroundColor: '#EEF2FF',
        color: '#4F46E5',
      },
    },
  };

  return <BannerAd config={referralConfig} />;
}
```

**Why this works better than a custom `<View>`:**
- **Click tracking out of the box** — `onClick` fires with the URL, so you can attribute referrals precisely.
- **Impression tracking** — know how many users actually *saw* the referral banner vs. scrolled past it.
- **Reward flow** — combine with `RewardAd` to gate a reward behind watching a short referral promo video.
- **Dynamic links** — swap `ctaUrl` per user, per campaign, per A/B test. The component doesn't care where the link goes.
- **Consistent with your other ads** — if you also run sponsored content or house ads, referral banners use the same theming and component system. One design language, zero one-off UI.

> **Tip:** You can use `RewardAd` instead of `BannerAd` to show a full-screen referral promo that rewards users with in-app currency for sharing their link. Just set `behavior.rewardOnClick: true` and handle `callbacks.onReward`.

---

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

MIT © [sagintel](https://github.com/sagintel)
