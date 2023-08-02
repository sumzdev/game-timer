import React from "react";
import styled from "@emotion/styled";
import { UI_TYPE } from "../constants/mode";

interface UITypeProps {
  uiType: (typeof UI_TYPE)[keyof typeof UI_TYPE];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  border: 0.15rem solid var(--font-color);
  box-sizing: border-box;
`;

const Content2 = styled.div<UITypeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  width: 70px;
  height: 60px;
  color: var(--font-color);
  background-color: #b6d2e8;
`;

const Content1 = styled(Content2)`
  border-bottom: 0.15rem solid var(--font-color);
  background-color: #cce7f3;
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
      <Content1 uiType={uiType}>
        <Text1 uiType={uiType}>12:30</Text1>
      </Content1>
      <Content2 uiType={uiType}>
        <Text2 uiType={uiType}>12:30</Text2>
      </Content2>
    </Container>
  );
}

export default UIOption;
