import { renderHook, act } from '@testing-library/react-native';
import { useAdLogic } from '../../src/hooks/useAdLogic';
import { AdConfig } from '../../src/types';

describe('useAdLogic', () => {
  const mockConfig: AdConfig = {
    id: 'test-ad-1',
    type: 'banner',
    content: {
      title: 'Test Ad',
      ctaText: 'Click Me',
      ctaUrl: 'https://example.com',
    },
    behavior: {
      autoShow: false,
      showCloseButton: true,
      countdownDuration: 3000,
      showCountdown: true,
    },
    callbacks: {
      onShow: jest.fn(),
      onHide: jest.fn(),
      onClose: jest.fn(),
      onClick: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('should initialize with idle state', () => {
    const { result } = renderHook(() => useAdLogic({ config: mockConfig }));
    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.isVisible).toBe(false);
  });

  it('should show ad when show() is called', () => {
    const { result } = renderHook(() => useAdLogic({ config: mockConfig }));
    act(() => {
      result.current.show();
    });
    expect(result.current.state.status).toBe('showing');
    expect(result.current.state.isVisible).toBe(true);
    expect(mockConfig.callbacks?.onShow).toHaveBeenCalled();
  });

  it('should hide ad when hide() is called', () => {
    const { result } = renderHook(() => useAdLogic({ config: mockConfig }));
    act(() => {
      result.current.show();
    });
    act(() => {
      result.current.hide();
    });
    expect(result.current.state.status).toBe('closed');
    expect(result.current.state.isVisible).toBe(false);
    expect(mockConfig.callbacks?.onHide).toHaveBeenCalled();
    expect(mockConfig.callbacks?.onClose).toHaveBeenCalled();
  });

  it('should track clicks', () => {
    const { result } = renderHook(() => useAdLogic({ config: mockConfig }));
    act(() => {
      result.current.handleClick('https://example.com');
    });
    expect(result.current.state.hasClicked).toBe(true);
    expect(mockConfig.callbacks?.onClick).toHaveBeenCalledWith('https://example.com');
  });

  it('should handle errors', () => {
    const { result } = renderHook(() => useAdLogic({ config: mockConfig }));
    const error = new Error('Test error');
    act(() => {
      result.current.handleError(error);
    });
    expect(result.current.state.status).toBe('error');
    expect(result.current.state.error).toBe(error);
  });
});
