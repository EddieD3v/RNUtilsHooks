import { renderHook } from '@testing-library/react-hooks';
import {
  useAsyncEffect,
  useCustomEffect,
} from '../useHookEffect/useHookEffect';

describe('useAsyncEffect', () => {
  test('should call asyncEffect on mount', async () => {
    const asyncEffect = jest.fn(() => Promise.resolve());
    const { waitFor } = renderHook(() => useAsyncEffect(asyncEffect, []));

    await waitFor(() => {
      expect(asyncEffect).toHaveBeenCalled();
    });
  });

  test('should call returnFunction on unmount', async () => {
    const returnFunction = jest.fn();
    const { unmount } = renderHook(() =>
      useAsyncEffect(() => Promise.resolve(), [], returnFunction)
    );

    unmount();

    expect(returnFunction).toHaveBeenCalled();
  });
});

describe('useCustomEffect', () => {
  test('should call effect on mount', () => {
    const effect = jest.fn();
    renderHook(() => useCustomEffect(effect, []));

    expect(effect).toHaveBeenCalled();
  });

  test('should call returnFunction on unmount', () => {
    const returnFunction = jest.fn();
    const { unmount } = renderHook(() =>
      useCustomEffect(() => {}, [], returnFunction)
    );

    unmount();

    expect(returnFunction).toHaveBeenCalled();
  });
});
