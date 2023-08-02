import { useState } from "react";
import {
  TIMER_MINUTES_KEY,
  TURN_LIMIT_MINUTES_KEY,
} from "../constants/localStorageKeys";
import {
  DEFAULT_TOTAL_MINUTES,
  DEFAULT_TURN_MINUTES,
  MAX_TIMER_MIN,
  MIN_LIMIT_MIN,
  MIN_TIMER_MIN,
} from "../constants/timer";
import useLocalStorage from "./useLocalStorage";

export interface SettingProps {
  totalMinutes: number;
  turnLimitMinutes: number;
}

export default function useTimerSetting() {
  const [initialized, setInitialized] = useState(
    !!localStorage.getItem(TIMER_MINUTES_KEY)
  );
  const [totalMinutes, setTotalMinutes] = useLocalStorage({
    key: TIMER_MINUTES_KEY,
    defaultValue: DEFAULT_TOTAL_MINUTES + "",
  });
  const [turnLimitMinutes, setTurnLimitMinutes] = useLocalStorage({
    key: TURN_LIMIT_MINUTES_KEY,
    defaultValue: DEFAULT_TURN_MINUTES + "",
  });

  const changeTimerSetting = ({
    totalMinutes,
    turnLimitMinutes,
  }: SettingProps) => {
    if (
      totalMinutes >= MIN_TIMER_MIN &&
      totalMinutes <= MAX_TIMER_MIN &&
      turnLimitMinutes >= MIN_LIMIT_MIN &&
      turnLimitMinutes < totalMinutes
    ) {
      setTotalMinutes(totalMinutes);
      setTurnLimitMinutes(turnLimitMinutes);
      setInitialized(true);
    }
  };

  return {
    initialized,
    totalMinutes: +totalMinutes,
    turnLimitMinutes: +turnLimitMinutes,
    changeTimerSetting,
  };
}
