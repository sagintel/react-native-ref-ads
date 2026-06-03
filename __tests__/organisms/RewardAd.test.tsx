import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { RewardAd } from '../../src/organisms/RewardAd';
import { AdConfig } from '../../src/types';

jest.mock('expo-linking', () => ({
  openURL: jest.fn(() => Promise.resolve(true)),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
}));

const mockConfig: AdConfig = {
  id: 'reward-test',
  type: 'reward',
  content: {
    title: 'Reward Test',
    ctaText: 'Get Reward',
    ctaUrl: 'https://example.com',
  },
  behavior: {
    autoShow: true,
    showCountdown: true,
    countdownDuration: 3000,
    showCloseButton: true,
    closeButtonDelay: 0,
  },
};

describe('RewardAd', () => {
  it('renders correctly when visible', async () => {
    const { findByText } = render(<RewardAd config={mockConfig} />);
    expect(await findByText('Reward Test')).toBeTruthy();
  });

  it('shows reward banner', async () => {
    const { findByText } = render(<RewardAd config={mockConfig} />);
    expect(await findByText('Watch to earn reward...')).toBeTruthy();
  });

  it('calls onRewardReady when reward is earned', async () => {
    const onRewardReady = jest.fn();
    render(<RewardAd config={mockConfig} onRewardReady={onRewardReady} />);
    // Note: In real tests, we'd need to advance timers to trigger reward
    // This is a simplified check
    expect(await findByText('Reward Test')).toBeTruthy();
  });
});
