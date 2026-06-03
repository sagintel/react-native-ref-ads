import React from 'react';
import { render } from '@testing-library/react-native';
import { AdTitle } from '../../src/atoms/AdTitle';
import { ThemeProvider } from '../../src/theme/ThemeProvider';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('AdTitle', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<AdTitle text="Test Title" />, { wrapper: Wrapper });
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('returns null when text is empty', () => {
    const { toJSON } = render(<AdTitle text="" />, { wrapper: Wrapper });
    expect(toJSON()).toBeNull();
  });

  it('returns null when text is undefined', () => {
    const { toJSON } = render(<AdTitle />, { wrapper: Wrapper });
    expect(toJSON()).toBeNull();
  });

  it('has correct accessibility role', () => {
    const { getByLabelText } = render(<AdTitle text="Test Title" />, { wrapper: Wrapper });
    const element = getByLabelText('Test Title');
    expect(element.props.accessibilityRole).toBe('header');
  });
});
