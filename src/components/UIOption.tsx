import React from "react";
import styled from "@emotion/styled";
import { UI_TYPE } from "../constants/mode";

interface UITypeProps {
  uiType: (typeof UI_TYPE)[keyof typeof UI_TYPE];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
`;

const Content = styled.div<UITypeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  width: 70px;
  height: 60px;
  :first-child {
    border-bottom: 2px solid black;
    background-color: #cce7f3;
  }
  background-color: #b6d2e8;
`;

const Text1 = styled.div<UITypeProps>`
  rotate: ${(props) =>
    props.uiType === UI_TYPE[2]
      ? "180deg"
      : props.uiType === UI_TYPE[3]
      ? "270deg"
      : ""};
`;
const Text2 = styled.div<UITypeProps>`
  rotate: ${(props) => (props.uiType === UI_TYPE[3] ? "270deg" : "")};
`;

function UIOption({ uiType }: UITypeProps) {
  return (
    <Container>
      <Content uiType={uiType}>
        <Text1 uiType={uiType}>12:30</Text1>
      </Content>
      <Content uiType={uiType}>
        <Text2 uiType={uiType}>12:30</Text2>
      </Content>
    </Container>
  );
}

export default UIOption;
