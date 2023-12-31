import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { STATUS, TIMER_STATUS } from "../constants/timer";

const MS_BY_COUNT = 1000;
const MS_TO_MIN = 60 * 1000;

interface UseTimerProps {
  totalMinutes: number;
  turnLimitMinutes: number;
  setTimerStatus: Dispatch<SetStateAction<keyof typeof STATUS>>;
}

export interface TimerSettingProps {
  totalMinutes: number;
  turnLimitMinutes: number;
}

export default function useTimer({
  totalMinutes,
  turnLimitMinutes,
  setTimerStatus,
}: UseTimerProps) {
  const [status, setStatus] = useState<keyof typeof TIMER_STATUS>(
    TIMER_STATUS.init
  );
  const [totalTime, setTotalTime] = useState(totalMinutes * MS_TO_MIN);
  const [turnTime, setTurnTime] = useState(turnLimitMinutes * MS_TO_MIN);
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
    initTurnTime();
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
    setTotalTime(totalMinutes * MS_TO_MIN);
  };
  const initTurnTime = () => {
    setTurnTime(turnLimitMinutes * MS_TO_MIN);
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

  const setTime = ({ totalMinutes, turnLimitMinutes }: TimerSettingProps) => {
    setStatus(TIMER_STATUS.init);
    setTotalTime(totalMinutes * MS_TO_MIN);
    setTurnTime(turnLimitMinutes * MS_TO_MIN);
  };

  useEffect(() => {
    if (turnTime - MS_BY_COUNT <= 0) {
      setStatus(TIMER_STATUS.endTurn);
      setTimerStatus(STATUS.end);
      clearTimerId();
    }
  }, [turnTime]);

  useEffect(() => {
    if (totalTime - MS_BY_COUNT <= 0) {
      setStatus(TIMER_STATUS.end);
      setTimerStatus(STATUS.end);
      clearTimerId();
    }
  }, [totalTime]);

  return {
    status,
    totalTime: totalTime,
    turnTime: turnTime,
    setTime,
    start,
    wait,
    pause,
    stop,
    reset,
  };
}
