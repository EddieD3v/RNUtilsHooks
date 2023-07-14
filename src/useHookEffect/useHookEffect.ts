import { useEffect } from 'react';

export function useAsyncEffect(
  asyncEffect: () => Promise<any>,
  dependencies: Array<any>,
  returnFunction?: () => void
) {
  useEffect(() => {
    let isActive = true;

    if (isActive) {
      asyncEffect().then();
    }

    return () => {
      if (returnFunction) {
        returnFunction();
      }
      isActive = false;
    };
  }, dependencies);
}

export function useCustomEffect(
  effect: () => void,
  dependencies: Array<any>,
  returnFunction?: () => void
) {
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      effect();
    }

    return () => {
      if (returnFunction) {
        returnFunction();
      }
      isActive = false;
    };
  }, dependencies);
}
