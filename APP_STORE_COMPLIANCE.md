# App Store & Play Store Compliance Guide

## Apple App Store Guidelines

### Advertising (Section 3.10)
- Ads must not interfere with app functionality
- Close buttons must be clearly visible and functional
- Ads must be distinguishable from app content (use `badge: 'Ad'`)
- Do not show unexpected interstitials without user action
- Reward ads must clearly state the reward before viewing

### Implementation Checklist
- [ ] All ads have `accessibilityLabel` and `accessibilityHint`
- [ ] Close buttons are minimum 44x44pt (iOS Human Interface Guidelines)
- [ ] Ads respect `prefersReducedMotion` (animations can be disabled)
- [ ] No ads on launch screen or during app startup
- [ ] Interstitial frequency is reasonable (use `autoCloseDelay`)

## Google Play Store Policies

### Deceptive Ads
- Ads must not mimic app UI or system notifications
- Use `sponsoredLabel` to clearly mark ads
- Do not use deceptive close buttons

### Interstitial Ads
- Must not be placed in a way that interferes with app navigation
- Must have clear close mechanisms
- Frequency caps recommended (implement via your own logic)

### Implementation Checklist
- [ ] Close buttons are minimum 48dp (Material Design guidelines)
- [ ] Ads do not trigger on back button unless `dismissOnBackButton: true`
- [ ] No ads during payment flows or sensitive actions
- [ ] Proper content rating for ad content

## COPPA / GDPR / CCPA Considerations

- Do not track children under 13 (set `testMode: true` for child-directed apps)
- Provide opt-out mechanisms for personalized ads
- Disclose data collection in privacy policy
- Use `expo-linking` to open privacy policy URLs
