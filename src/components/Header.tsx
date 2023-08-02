import { useState } from "react";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import RefreshIcon from "@mui/icons-material/Refresh";
import { BTN_DISABLE_BY_STATUS, STATUS } from "../constants/timer";
import { TimerHandlersType } from "../hooks/useGameTimer";
import { SettingDialog } from ".";
import { SettingProps } from "../hooks/useTimerSetting";
import { UI_TYPE } from "../constants/mode";

interface HeaderProps {
  initialized: boolean;
  status: keyof typeof STATUS;
  curSetting: {
    totalMinutes: number;
    turnLimitMinutes: number;
    uiType: (typeof UI_TYPE)[keyof typeof UI_TYPE];
  };
  changeSetting: ({
    totalMinutes,
    turnLimitMinutes,
    uiType,
  }: SettingProps) => void;
  handlers: TimerHandlersType;
}

const Container = styled.div`
  background: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 60px;
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

const ControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

function Header({
  status,
  initialized,
  curSetting,
  changeSetting,
  handlers: { start, pause, stop, reset, setTime },
}: HeaderProps) {
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(!initialized);

  const handleSubmitSetting = ({
    totalMinutes,
    turnLimitMinutes,
    uiType,
  }: SettingProps) => {
    changeSetting({ totalMinutes, turnLimitMinutes, uiType });
    setTime({ totalMinutes, turnLimitMinutes });
    setIsOpenSetting(false);
  };

  return (
    <Container>
      <Button
        aria-label="settings"
        disabled={BTN_DISABLE_BY_STATUS[status]["setting"]}
        onClick={() => setIsOpenSetting(true)}
      >
        <SettingIcon />
        <ButtonText>settings</ButtonText>
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
      <SettingDialog
        isOpen={isOpenSetting}
        curSetting={curSetting}
        initialized={initialized}
        onClose={() => setIsOpenSetting(false)}
        handleSubmitSetting={handleSubmitSetting}
      />
    </Container>
  );
}

export default Header;
