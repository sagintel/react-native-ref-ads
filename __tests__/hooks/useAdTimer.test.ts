import { renderHook, act } from '@testing-library/react-native';
import { useAdTimer } from '../../src/hooks/useAdTimer';

describe('useAdTimer', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('should initialize with correct duration', () => {
    const { result } = renderHook(() => useAdTimer({ duration: 5000, autoStart: false }));
    expect(result.current.timeLeft).toBe(5000);
    expect(result.current.progress).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('should start countdown when start() is called', () => {
    const { result } = renderHook(() => useAdTimer({ duration: 5000, autoStart: false }));
    act(() => {
      result.current.start();
    });
    expect(result.current.isRunning).toBe(true);
  });

  it('should pause countdown when pause() is called', () => {
    const { result } = renderHook(() => useAdTimer({ duration: 5000, autoStart: true }));
    act(() => {
      result.current.pause();
    });
    expect(result.current.isRunning).toBe(false);
  });

  it('should reset to initial duration', () => {
    const { result } = renderHook(() => useAdTimer({ duration: 5000, autoStart: true }));
    act(() => {
      result.current.reset();
    });
    expect(result.current.timeLeft).toBe(5000);
    expect(result.current.progress).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it('should call onComplete when timer finishes', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() =>
      useAdTimer({ duration: 1000, autoStart: true, onComplete })
    );
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(onComplete).toHaveBeenCalled();
  });
});
