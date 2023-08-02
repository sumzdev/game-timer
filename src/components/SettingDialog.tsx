import React from "react";
import styled from "@emotion/styled";
import { AppBar, Button, Dialog } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { SettingProps } from "../hooks/useTimerSetting";

interface SettingDialogProps {
  isOpen: boolean;
  curSetting: SettingProps;
  handleSubmitSetting: ({
    totalMinutes,
    turnLimitMinutes,
  }: SettingProps) => void;
  onClose: () => void;
}

const DialogContainer = styled(Dialog)`
  background: none;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
`;

const Bar = styled(AppBar)`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(Button)`
  position: absolute;
  left: 0px;
  color: #fff;
`;

function SettingDialog({
  isOpen,
  curSetting,
  // handleSubmitSetting,
  onClose,
}: SettingDialogProps) {
  console.log(curSetting);

  return (
    <DialogContainer fullScreen open={isOpen} onClose={onClose}>
      <Container>
        <Bar>
          <p>Settings</p>
          <CloseButton onClick={onClose}>
            <ArrowBackIosIcon />
          </CloseButton>
        </Bar>
        Setting
      </Container>
    </DialogContainer>
  );
}

export default SettingDialog;
