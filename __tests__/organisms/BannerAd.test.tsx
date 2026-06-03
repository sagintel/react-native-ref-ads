import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { BannerAd } from '../../src/organisms/BannerAd';
import { AdConfig } from '../../src/types';

jest.mock('expo-linking', () => ({
  openURL: jest.fn(() => Promise.resolve(true)),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
}));

const mockConfig: AdConfig = {
  id: 'banner-test',
  type: 'banner',
  content: {
    title: 'Banner Test',
    description: 'Test description',
    ctaText: 'Learn More',
    ctaUrl: 'https://example.com',
    media: { uri: 'https://example.com/image.jpg', type: 'image' },
  },
  behavior: {
    autoShow: true,
    showCloseButton: true,
  },
};

describe('BannerAd', () => {
  it('renders correctly when visible', async () => {
    const { findByText } = render(<BannerAd config={mockConfig} />);
    expect(await findByText('Banner Test')).toBeTruthy();
  });

  it('renders CTA button', async () => {
    const { findByText } = render(<BannerAd config={mockConfig} />);
    expect(await findByText('Learn More')).toBeTruthy();
  });

  it('calls onStateChange when visibility changes', async () => {
    const onStateChange = jest.fn();
    render(<BannerAd config={mockConfig} onStateChange={onStateChange} />);
    await waitFor(() => {
      expect(onStateChange).toHaveBeenCalledWith(true);
    });
  });
});
