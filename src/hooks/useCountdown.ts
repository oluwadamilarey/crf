import { useCallback } from 'react';

import { useBoolean } from '@/hooks/useBoolean';
import { useCounter } from '@/hooks/useCounter';
import { useInterval } from '@/hooks/useInterval';

// New interface IN & OUT
interface CountdownOption {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  isStarted?: boolean;
  countStop?: number;
}
interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
  isCountdownRunning: boolean;
}

/**
 * New interface with default value
 *
 * @param  {CountdownOption} countdownOption
 * @param  {number} countdownOption.countStart - the countdown's starting number, initial value of the returned number.
 * @param  {?number} countdownOption.countStop -  `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param  {?number} countdownOption.intervalMs - `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} countdownOption.isIncrement - `false` by default, true if the countdown is increment.
 * @param {?boolean} countdownOption.isStarted - `false` by default, true if the countdown is started
 * @returns [counter, CountdownControllers]
 */
export function useCountdown(
  countdownOption: CountdownOption,
): [number, CountdownControllers];

export function useCountdown(
  countdownOption: CountdownOption,
): [number, CountdownControllers] {
  let { intervalMs, isIncrement, countStop, isStarted } = countdownOption;
  const { countStart } = countdownOption;
  // default values
  intervalMs = intervalMs ?? 1000;
  isIncrement = isIncrement ?? false;
  countStop = countStop ?? 0;
  isStarted = isStarted ?? false;

  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(countStart);

  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(isStarted);

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [
    count,
    {
      startCountdown,
      stopCountdown,
      resetCountdown,
      isCountdownRunning,
    } satisfies CountdownControllers,
  ];
}
