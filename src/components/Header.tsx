import React from "react";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import RefreshIcon from "@mui/icons-material/Refresh";
import { BTN_DISABLE_BY_STATUS, STATUS } from "../constants/timer";
import { TimerHandlersType, TimerSettingItems } from "../hooks/useGameTimer";

interface HeaderProps {
  status: keyof typeof STATUS;
  curSetting: { timerMinutes: number; limitMinutes: number };
  changeTimerSetting: ({ totalTime, limitTime }: TimerSettingItems) => void;
  handlers: TimerHandlersType;
}

const Container = styled.div`
  background: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60px;
  padding: 10px 0;
`;

const Button = styled(IconButton)`
  display: flex;
  flex-direction: column;
  color: var(--btn-color);
`;
const ButtonText = styled.p`
  font-size: 0.6rem;
`;

const ControllerWrapper = styled.div``;

const ThemeWrapper = styled.div``;

const SettingIcon = styled(SettingsIcon)`
  font-size: 1.8rem;
`;
const StartIcon = styled(PlayArrowIcon)`
  font-size: 1.8rem;
`;
const StyledPauseIcon = styled(PauseIcon)`
  font-size: 1.8rem;
`;
const StyledStopIcon = styled(StopIcon)`
  font-size: 1.8rem;
`;
const ResetIcon = styled(RefreshIcon)`
  font-size: 1.8rem;
`;

function Menu({
  status,
  // curSetting,
  // changeTimerSetting,
  handlers: { start, pause, stop, reset },
}: HeaderProps) {
  return (
    <Container>
      <Button aria-label="setting">
        <SettingIcon />
        <ButtonText>setting</ButtonText>
      </Button>
      <ControllerWrapper>
        <Button
          aria-label="start"
          onClick={() => start()}
          disabled={BTN_DISABLE_BY_STATUS[status]["start"]}
        >
          <StartIcon />
          <ButtonText>start</ButtonText>
        </Button>
        <Button
          aria-label="pause"
          onClick={() => pause()}
          disabled={BTN_DISABLE_BY_STATUS[status]["pause"]}
        >
          <StyledPauseIcon />
          <ButtonText>pause</ButtonText>
        </Button>
        <Button
          aria-label="stop"
          onClick={() => stop()}
          disabled={BTN_DISABLE_BY_STATUS[status]["stop"]}
        >
          <StyledStopIcon />
          <ButtonText>stop</ButtonText>
        </Button>
        <Button
          aria-label="setting"
          onClick={() => reset()}
          disabled={BTN_DISABLE_BY_STATUS[status]["reset"]}
        >
          <ResetIcon />
          <ButtonText>reset</ButtonText>
        </Button>
      </ControllerWrapper>
      <ThemeWrapper></ThemeWrapper>
    </Container>
  );
}

export default Menu;
