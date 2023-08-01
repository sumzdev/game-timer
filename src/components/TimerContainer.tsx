import React from "react";
import styled from "@emotion/styled";
import { STATUS } from "../constants/timer";
import { TimerHandlersType } from "../hooks/useGameTimer";
import { formatElapsedTime } from "../utils/timeToString";

interface TimerContainerProps {
  status: keyof typeof STATUS;
  curTurn: boolean;
  totalTime: number;
  turnTime: number;
  handlers: TimerHandlersType;
}

const Container = styled.div`
  border: 1px solid gray;
  width: 100%;
  height: 100%;
`;

function TimerContainer({
  status,
  curTurn,
  totalTime,
  turnTime,
}: // handlers: { start, switchTurn, pause, stop, reset },
TimerContainerProps) {
  return (
    <Container>
      <p>{"status :" + status}</p>
      <p>{"curTurn : " + curTurn}</p>
      <p>{"totalTime : " + formatElapsedTime(totalTime)}</p>
      <p>{"turnTime : " + formatElapsedTime(turnTime)}</p>
      {/* <button onClick={() => switchTurn()}>switch</button> */}
    </Container>
  );
}

export default TimerContainer;
