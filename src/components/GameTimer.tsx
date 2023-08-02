import React from "react";
import styled from "@emotion/styled";
import { Header, TimerContainer } from ".";
import useGameTimer from "../hooks/useGameTimer";
import { TURN } from "../constants/timer";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 10px;
`;

function GameTimer() {
  const {
    status,
    turn,
    timer: { [TURN.player1]: player1, [TURN.player2]: player2 },
    timerMinutes,
    limitMinutes,
    changeTimerSetting,
    handlers,
  } = useGameTimer();

  return (
    <Container>
      <Header
        status={status}
        curSetting={{ timerMinutes, limitMinutes }}
        changeTimerSetting={changeTimerSetting}
        handlers={handlers}
      />
      <Wrapper>
        <TimerContainer
          gameStatus={status}
          status={player1.status}
          player={TURN.player1}
          curTurn={turn === TURN.player1}
          totalTime={player1.totalTime}
          turnTime={player1.turnTime}
          handlers={handlers}
        />
        <TimerContainer
          gameStatus={status}
          status={player2.status}
          player={TURN.player2}
          curTurn={turn === TURN.player2}
          totalTime={player2.totalTime}
          turnTime={player2.turnTime}
          handlers={handlers}
        />
      </Wrapper>
    </Container>
  );
}

export default GameTimer;
