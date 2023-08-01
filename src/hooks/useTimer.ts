import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  DEAFAULT_TOTAL_MINUTES,
  DEFAULT_TURN_MINUTES,
  STATUS,
  TIMER_STATUS,
} from "../constants/timer";

const MS_BY_COUNT = 100;
const MS_TO_MIN = 60 * 1000;

export default function useTimer(
  setTimerStatus: Dispatch<SetStateAction<keyof typeof STATUS>>
) {
  const [status, setStatus] = useState<keyof typeof TIMER_STATUS>(
    TIMER_STATUS.init
  );
  const [totalTime, setTotalTime] = useState(
    DEAFAULT_TOTAL_MINUTES * MS_TO_MIN
  );
  const [turnTime, setTurnTime] = useState(DEFAULT_TURN_MINUTES * MS_TO_MIN);
  const [endTimerMinutes, setEndTimerMinutes] = useState<number>(
    DEAFAULT_TOTAL_MINUTES
  );
  const [limitTimeMinutes, setLimitTimeMinutes] =
    useState<number>(DEFAULT_TURN_MINUTES);
  const timerIdRef = useRef<number | null>(null);

  const start = () => {
    if (status === TIMER_STATUS.stop || status === TIMER_STATUS.init) {
      setStatus(TIMER_STATUS.running);
      updater();
    } else if (status === TIMER_STATUS.wait) {
      initTurnTime();
      setStatus(TIMER_STATUS.running);
      updater();
    } else if (status === TIMER_STATUS.pause) {
      setStatus(TIMER_STATUS.running);
      updater();
    }
  };

  const wait = () => {
    setStatus(TIMER_STATUS.wait);
    clearTimerId();
  };

  const pause = () => {
    setStatus(TIMER_STATUS.pause);
    clearTimerId();
  };

  const stop = () => {
    setStatus(TIMER_STATUS.stop);
    clearTimerId();
  };

  const reset = () => {
    setStatus(TIMER_STATUS.init);
    initTotalTime();
    initTurnTime();
    clearTimerId();
  };

  const initTotalTime = () => {
    setTotalTime(endTimerMinutes * MS_TO_MIN);
  };
  const initTurnTime = () => {
    setTurnTime(limitTimeMinutes * MS_TO_MIN);
  };

  const clearTimerId = () => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  const updater = () => {
    let startTime = Date.now();

    timerIdRef.current = setInterval(() => {
      const now = Date.now();
      const diffTime = now - startTime;

      setTotalTime((prevTotalTime) => prevTotalTime - diffTime);
      setTurnTime((prevTurnTime) => prevTurnTime - diffTime);

      startTime = now;

      if (turnTime - MS_BY_COUNT <= 0) {
        setStatus(TIMER_STATUS.endTurn);
        clearTimerId();
      }
      if (totalTime - MS_BY_COUNT <= 0) {
        setStatus(TIMER_STATUS.end);
        clearTimerId();
      }
    }, MS_BY_COUNT);
  };

  useEffect(() => {
    if (turnTime <= 0) {
      setTimerStatus(STATUS.end);
      setStatus(TIMER_STATUS.endTurn);
      clearTimerId();
      initTotalTime();
      initTurnTime();
    }
  }, [turnTime]);

  useEffect(() => {
    if (totalTime <= 0) {
      setStatus(TIMER_STATUS.end);
      clearTimerId();
      initTotalTime();
      initTurnTime();
    }
  }, [totalTime]);

  return {
    status,
    totalTime: totalTime,
    turnTime: turnTime,
    setEndTimerMinutes,
    setLimitTimeMinutes,
    start,
    wait,
    pause,
    stop,
    reset,
  };
}
