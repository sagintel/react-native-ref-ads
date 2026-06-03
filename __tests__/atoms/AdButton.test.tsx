import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AdButton } from '../../src/atoms/AdButton';
import { ThemeProvider } from '../../src/theme/ThemeProvider';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('AdButton', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<AdButton text="Click Me" />, { wrapper: Wrapper });
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<AdButton text="Click Me" onPress={onPress} />, {
      wrapper: Wrapper,
    });
    fireEvent.press(getByText('Click Me'));
    expect(onPress).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <AdButton text="Click Me" onPress={onPress} disabled />,
      { wrapper: Wrapper }
    );
    expect(getByText('Click Me').parent?.props.accessibilityState?.disabled).toBe(true);
  });

  it('returns null when text is empty', () => {
    const { toJSON } = render(<AdButton text="" />, { wrapper: Wrapper });
    expect(toJSON()).toBeNull();
  });
});
