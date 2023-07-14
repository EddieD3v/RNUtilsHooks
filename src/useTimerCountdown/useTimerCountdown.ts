import { useState } from 'react';
import { useCustomEffect } from '../useHookEffect';
import moment from 'moment';

type TimerCallback = () => void;

const useTimerCountdown = (initialTime: string, callback?: TimerCallback) => {
  const [time, setTime] = useState(initialTime);

  useCustomEffect(() => {
    const timer = moment(initialTime, ['mm:ss']);
    const interval = setInterval(() => {
      const newTimer = timer.subtract(1, 'seconds');
      if (newTimer.get('minutes') === 0 && newTimer.get('seconds') === 0) {
        clearInterval(interval);
        if (callback) {
          callback();
        }
      }
      setTime(`${newTimer.get('minutes')}:${newTimer.get('seconds')}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [initialTime, callback]);

  return { time };
};

export default useTimerCountdown;
