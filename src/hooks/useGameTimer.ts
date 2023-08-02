import { useState } from "react";
import { STATUS, TURN } from "../constants/timer";
import useTimer, { TimerSettingProps } from "./useTimer";

export interface TimerHandlersType {
  start: (turn?: keyof typeof TURN) => void;
  switchTurn: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
  setTime: ({ totalMinutes, turnLimitMinutes }: TimerSettingProps) => void;
}

export default function useGameTimer({
  totalMinutes,
  turnLimitMinutes,
}: {
  totalMinutes: number;
  turnLimitMinutes: number;
}) {
  const [status, setStatus] = useState<keyof typeof STATUS>(STATUS.init);
  const [turn, setTurn] = useState<keyof typeof TURN>(TURN.player1);

  const timer = {
    [TURN.player1]: useTimer({
      totalMinutes,
      turnLimitMinutes,
      setTimerStatus: setStatus,
    }),
    [TURN.player2]: useTimer({
      totalMinutes,
      turnLimitMinutes,
      setTimerStatus: setStatus,
    }),
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

  const setTime = ({ totalMinutes, turnLimitMinutes }: TimerSettingProps) => {
    timer[turn].setTime({ totalMinutes, turnLimitMinutes });
    timer[getOtherPlayer(turn)].setTime({ totalMinutes, turnLimitMinutes });
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
    handlers: { setTime, start, switchTurn, pause, stop, reset },
  };
}
