import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  border: 1px solid gray;
  width: 100%;
  height: 100%;
`;

function TimerContainer() {
  return <Container>{"timer"}</Container>;
}

export default TimerContainer;
