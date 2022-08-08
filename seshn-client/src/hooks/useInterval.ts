import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay?: number | null) => {
  const savedCallback = useRef<() => void>(() => null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
};
