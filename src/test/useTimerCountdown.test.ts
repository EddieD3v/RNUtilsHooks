import { renderHook, act } from '@testing-library/react-hooks';
import useTimerCountdown from '../useTimerCountdown';

jest.useFakeTimers();

describe('useTimerCountdown', () => {
  test('should start the countdown and update the time correctly', () => {
    const { result } = renderHook(() => useTimerCountdown('0:10'));

    expect(result.current.time).toBe('0:10');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe('0:9');

    act(() => {
      jest.advanceTimersByTime(9000);
    });

    expect(result.current.time).toBe('0:0');
  });

  test('should call the callback when the time is up', () => {
    const callback = jest.fn();
    renderHook(() => useTimerCountdown('0:01', callback));

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
