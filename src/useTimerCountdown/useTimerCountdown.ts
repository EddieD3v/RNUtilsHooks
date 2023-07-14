import { useState } from 'react';
import { useCustomEffect } from '../useHookEffect';
import moment from 'moment';

type TimerCallback = () => void;

function useTimerCountdown(initialTime: string, callback?: TimerCallback) {
  const [time, setTime] = useState(initialTime);
  const [timer, setTimer] = useState(moment(initialTime, ['mm:ss']));
  let interval: NodeJS.Timer;
  useCustomEffect(
    () => {
      interval = setInterval(() => {
        const newTimer = timer.subtract(1, 'seconds');
        if (newTimer.get('minutes') === 0 && newTimer.get('seconds') === 0) {
          clearInterval(interval);
          if (callback) {
            callback();
          }
        }
        setTime(`${newTimer.get('minutes')}:${newTimer.get('seconds')}`);
        setTimer(newTimer);
      }, 1000);
    },
    [initialTime, callback, timer],
    () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  );
  function resetTimer() {
    setTimer(moment(initialTime, ['mm:ss']));
    setTime(initialTime);
  }
  return {
    time,
    resetTimer,
  };
}
export default useTimerCountdown;
