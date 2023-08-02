import React from "react";
import styled from "@emotion/styled";
import { STATUS, TIMER_STATUS, TURN } from "../constants/timer";
import { TimerHandlersType } from "../hooks/useGameTimer";
import { formatElapsedTime } from "../utils/timeToString";

const Color = {
  red: "red",
  green: "green",
  yellow: "yellow",
  gray: "gray",
} as const;

interface TimerContainerProps {
  gameStatus: keyof typeof STATUS;
  status: keyof typeof TIMER_STATUS;
  player: keyof typeof TURN;
  curTurn: boolean;
  totalTime: number;
  turnTime: number;
  handlers: TimerHandlersType;
}

interface ColorProps {
  color: keyof typeof Color;
}
interface ContainerProps extends ColorProps {
  cursor: string;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  user-select: none;
  border-radius: 30px;
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => `var(--${props.color})`};
  border: 7px solid ${(props) => `var(--border-${props.color})`};
  transition: all 0.1s ease;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
`;

const TotalTime = styled.div`
  font-size: 5rem;
  color: var(--font-color);
`;

const TurnTime = styled.div`
  font-size: 3em;
  color: var(--font-color);
`;

const ActionTextWrapper = styled.div`
  position: relative;
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ActionText = styled.div<ColorProps>`
  position: absolute;
  bottom: 20px;
  width: 60%;
  border-radius: 8px;
  font-size: 1.4rem;
  padding: 4px 30px;
  margin-top: 10px;
  color: var(--font-color);
  border: 3px dashed ${(props) => `var(--border-${props.color})`};
`;

function TimerContainer({
  gameStatus,
  status,
  player,
  // curTurn,
  totalTime,
  turnTime,
  handlers: { start, switchTurn, reset },
}: TimerContainerProps) {
  let buttonText = "";
  let color: keyof typeof Color = Color.yellow;
  let cursor = "pointer";

  switch (status) {
    case TIMER_STATUS.init:
      buttonText = "Start";
      color = Color.yellow;
      break;
    case TIMER_STATUS.running:
      buttonText = "Switch";
      color = Color.green;
      break;
    case TIMER_STATUS.pause:
      color = Color.gray;
      buttonText = "Continue";
      break;
    case TIMER_STATUS.stop:
      color = Color.gray;
      buttonText = "Reset";
      break;
    case TIMER_STATUS.end:
    case TIMER_STATUS.endTurn:
      color = Color.red;
      buttonText = "Reset";
      break;
    case TIMER_STATUS.wait:
      color = Color.gray;
      cursor = gameStatus === STATUS.end ? "pointer" : "default";
      buttonText = gameStatus === STATUS.end ? "Reset" : "";
      break;
  }

  const onClickHandler = () => {
    switch (status) {
      case TIMER_STATUS.init:
        start(player);
        break;
      case TIMER_STATUS.running:
        switchTurn();
        break;
      case TIMER_STATUS.pause:
        start();
        break;
      case TIMER_STATUS.stop:
      case TIMER_STATUS.end:
      case TIMER_STATUS.endTurn:
        reset();
        break;
      case TIMER_STATUS.wait:
        if (gameStatus === STATUS.end) reset();
        break;
    }
  };

  return (
    <Container color={color} onClick={onClickHandler} cursor={cursor}>
      <TimeWrapper>
        <TotalTime>{formatElapsedTime(totalTime)}</TotalTime>
        <TurnTime>{formatElapsedTime(turnTime)}</TurnTime>
      </TimeWrapper>
      <ActionTextWrapper>
        {buttonText && <ActionText color={color}>{buttonText}</ActionText>}
      </ActionTextWrapper>
    </Container>
  );
}

export default TimerContainer;
