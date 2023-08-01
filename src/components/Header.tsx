import React from "react";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Container = styled.div`
  background: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60px;
  padding: 10px 0;
`;

const ControllerWrapper = styled.div``;

const ThemeWrapper = styled.div``;

const SettingIcon = styled(SettingsIcon)`
  font-size: 1.8rem;
`;

function Menu() {
  return (
    <Container>
      <IconButton aria-label="setting">
        <SettingIcon />
      </IconButton>
      <ControllerWrapper>
        <button>play</button>
        <button>pause</button>
        <button>stop</button>
        <button>restart</button>
      </ControllerWrapper>
      <ThemeWrapper></ThemeWrapper>
    </Container>
  );
}

export default Menu;
