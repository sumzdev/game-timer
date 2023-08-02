import { useState } from "react";
import {
  TIMER_MINUTES_KEY,
  TURN_LIMIT_MINUTES_KEY,
  UI_TYPE_KEY,
} from "../constants/localStorageKeys";
import {
  DEFAULT_TOTAL_MINUTES,
  DEFAULT_TURN_MINUTES,
  MAX_TIMER_MIN,
  MIN_LIMIT_MIN,
  MIN_TIMER_MIN,
} from "../constants/timer";
import useLocalStorage from "./useLocalStorage";
import { UI_TYPE } from "../constants/mode";

export interface SettingProps {
  totalMinutes: number;
  turnLimitMinutes: number;
  uiType: (typeof UI_TYPE)[keyof typeof UI_TYPE];
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
  const [uiType, setUiType] = useLocalStorage({
    key: UI_TYPE_KEY,
    defaultValue: "1",
  });

  const changeSetting = ({
    totalMinutes,
    turnLimitMinutes,
    uiType,
  }: SettingProps) => {
    if (
      totalMinutes >= MIN_TIMER_MIN &&
      totalMinutes <= MAX_TIMER_MIN &&
      turnLimitMinutes >= MIN_LIMIT_MIN &&
      turnLimitMinutes < totalMinutes
    ) {
      setTotalMinutes(totalMinutes);
      setTurnLimitMinutes(turnLimitMinutes);
      setUiType(uiType);
      setInitialized(true);
    }
  };

  return {
    initialized,
    totalMinutes: +totalMinutes,
    turnLimitMinutes: +turnLimitMinutes,
    uiType,
    changeSetting,
  };
}
