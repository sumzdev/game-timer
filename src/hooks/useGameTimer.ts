import { useState } from "react";
import {
  DEFAULT_TOTAL_MINUTES,
  DEFAULT_TURN_MINUTES,
  MAX_TIMER_MIN,
  MIN_LIMIT_MIN,
  MIN_TIMER_MIN,
  STATUS,
  TURN,
} from "../constants/timer";
import useTimer from "./useTimer";

export interface TimerSettingItems {
  totalTime: number;
  limitTime: number;
}

export interface TimerHandlersType {
  start: (turn?: keyof typeof TURN) => void;
  switchTurn: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
}

export default function useGameTimer() {
  const [status, setStatus] = useState<keyof typeof STATUS>(STATUS.init);
  const [turn, setTurn] = useState<keyof typeof TURN>(TURN.player1);

  const [timerMinutes, setTimerMinutes] = useState(DEFAULT_TOTAL_MINUTES);
  const [limitMinutes, setLimitMinutes] = useState(DEFAULT_TURN_MINUTES);

  const timer = {
    [TURN.player1]: useTimer(setStatus),
    [TURN.player2]: useTimer(setStatus),
  };

  const toggleTurn = () => {
    setTurn((prevTurn) =>
      prevTurn === TURN.player1 ? TURN.player2 : TURN.player1
    );
  };

  const getOtherPlayer = (turn: keyof typeof TURN) =>
    turn === TURN.player1 ? TURN.player2 : TURN.player1;

  const start = (turnToStart?: keyof typeof TURN) => {
    setStatus(STATUS.running);
    const curTurn = turnToStart || turn;
    timer[curTurn].start();
    timer[getOtherPlayer(curTurn)].wait();
  };

  const switchTurn = () => {
    if (status === STATUS.running) {
      timer[turn].wait();
      timer[getOtherPlayer(turn)].start();
      toggleTurn();
    }
  };

  const pause = () => {
    setStatus(STATUS.pause);
    timer[turn].pause();
    timer[getOtherPlayer(turn)].pause();
  };

  const stop = () => {
    setStatus(STATUS.stop);
    timer[turn].stop();
    timer[getOtherPlayer(turn)].stop();
  };

  const reset = () => {
    setStatus(STATUS.init);
    timer[turn].reset();
    timer[getOtherPlayer(turn)].reset();
  };

  const changeTimerSetting = ({ totalTime, limitTime }: TimerSettingItems) => {
    if (
      totalTime >= MIN_TIMER_MIN &&
      totalTime <= MAX_TIMER_MIN &&
      limitTime >= MIN_LIMIT_MIN &&
      limitTime < totalTime
    ) {
      setTimerMinutes(totalTime);
      timer[TURN.player1].setEndTimerMinutes(totalTime);
      timer[TURN.player2].setEndTimerMinutes(totalTime);

      setLimitMinutes(limitTime);
      timer[TURN.player1].setLimitTimeMinutes(limitTime);
      timer[TURN.player2].setLimitTimeMinutes(limitTime);
    }
  };

  return {
    status,
    turn,
    timer: {
      [TURN.player1]: {
        totalTime: timer[TURN.player1].totalTime,
        turnTime: timer[TURN.player1].turnTime,
        status: timer[TURN.player1].status,
      },
      [TURN.player2]: {
        totalTime: timer[TURN.player2].totalTime,
        turnTime: timer[TURN.player2].turnTime,
        status: timer[TURN.player2].status,
      },
    },
    timerMinutes,
    limitMinutes,
    changeTimerSetting,
    handlers: { start, switchTurn, pause, stop, reset },
  };
}
