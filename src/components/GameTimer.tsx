import React from "react";
import styled from "@emotion/styled";
import { Header, TimerContainer } from ".";

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
`;

function GameTimer() {
  return (
    <Container>
      <Header />
      <Wrapper>
        <TimerContainer />
        <TimerContainer />
      </Wrapper>
    </Container>
  );
}

export default GameTimer;
