import { renderHook, act } from '@testing-library/react-hooks';
import useTimerCountdown from '../useTimerCountdown';

describe('useTimerCountdown', () => {
  jest.useFakeTimers();

  it('should initialize with the provided initial time', () => {
    const initialTime = '0:10';
    const { result } = renderHook(() => useTimerCountdown(initialTime));
    expect(result.current.time).toBe(initialTime);
  });

  it('should update the time every second until it reaches 0', () => {
    const initialTime = '0:10';
    const { result } = renderHook(() => useTimerCountdown(initialTime));

    expect(result.current.time).toBe(initialTime);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe('0:9');

    act(() => {
      jest.advanceTimersByTime(9000);
    });

    expect(result.current.time).toBe('0:0');
  });

  it('should call the callback when the timer reaches 0', () => {
    const initialTime = '0:5';
    const callback = jest.fn();
    renderHook(() => useTimerCountdown(initialTime, callback));

    act(() => {
      jest.runAllTimers();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer to the initial time', () => {
    const initialTime = '0:10';
    const { result } = renderHook(() => useTimerCountdown(initialTime));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.time).toBe('0:5');

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.time).toBe(initialTime);
  });
});
