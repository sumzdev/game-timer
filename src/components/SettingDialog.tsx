import styled from "@emotion/styled";
import {
  AppBar,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { MAX_TIMER_MIN, MIN_TIMER_MIN } from "../constants/timer";
import { SubmitHandler, useForm } from "react-hook-form";
import { SettingProps } from "../hooks/useTimerSetting";
import { UI_TYPE } from "../constants/mode";
import UIRadioGroup from "./UIRadioGroup";

interface SettingDialogProps {
  isOpen: boolean;
  curSetting: SettingProps;
  initialized: boolean;
  handleSubmitSetting: ({
    totalMinutes,
    turnLimitMinutes,
  }: SettingProps) => void;
  onClose: () => void;
}

export interface SettingFormFields {
  totalMinutes: number;
  turnLimitMinutes: number;
  uiType: (typeof UI_TYPE)[keyof typeof UI_TYPE];
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

const SettingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputContainer = styled(FormControl)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30px;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 30px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--font-color);
`;

const UnitLabel = styled(Label)`
  margin-left: 5px;
`;

const InputNumber = styled(TextField)`
  width: 50px;
  .MuiInput-root {
    padding: 0 10px;
  }
`;

const HelperText = styled(FormHelperText)`
  height: 20px;
  color: var(--border-red);
`;

const SubmitButton = styled(Button)`
  margin: 40px auto 0;
  width: 70%;
`;

function SettingDialog({
  isOpen,
  curSetting,
  initialized,
  handleSubmitSetting,
  onClose,
}: SettingDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingFormFields>({
    defaultValues: curSetting,
  });

  const onSubmit: SubmitHandler<SettingFormFields> = (data) => {
    const { totalMinutes, turnLimitMinutes, uiType } = data;
    handleSubmitSetting({
      totalMinutes: +totalMinutes,
      turnLimitMinutes: +turnLimitMinutes,
      uiType,
    });
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <DialogContainer fullScreen open={isOpen} onClose={handleClose}>
      <Container>
        <Bar>
          <p>Settings</p>
          {initialized && (
            <CloseButton onClick={handleClose}>
              <ArrowBackIosIcon />
            </CloseButton>
          )}
        </Bar>
        <SettingForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <InputWrapper>
              <Label htmlFor="total-minutes">플레이어당 게임시간</Label>
              <Flex>
                <InputNumber
                  type="number"
                  id="toal-minutes"
                  variant="standard"
                  error={!!errors?.totalMinutes}
                  {...register("totalMinutes", {
                    min: MIN_TIMER_MIN,
                    max: MAX_TIMER_MIN,
                    maxLength: 2,
                  })}
                />
                <UnitLabel>분</UnitLabel>
              </Flex>
            </InputWrapper>
            <HelperText>
              {errors?.totalMinutes &&
                `${MIN_TIMER_MIN}이상 ${MAX_TIMER_MIN}이하의 시간만 설정 가능합니다.`}
            </HelperText>
          </InputContainer>
          <InputContainer>
            <InputWrapper>
              <Label htmlFor="turn-limit-minutes">게임턴당 제한시간</Label>
              <Flex>
                <InputNumber
                  type="number"
                  id="turn-limit-minutes"
                  variant="standard"
                  error={!!errors?.turnLimitMinutes}
                  {...register("turnLimitMinutes", {
                    min: MIN_TIMER_MIN,
                    max: MAX_TIMER_MIN,
                    maxLength: 2,
                  })}
                />
                <UnitLabel>분</UnitLabel>
              </Flex>
            </InputWrapper>
            <HelperText>
              {errors?.turnLimitMinutes &&
                `${MIN_TIMER_MIN}이상 ${MAX_TIMER_MIN}이하의 시간만 설정 가능합니다.`}
            </HelperText>
          </InputContainer>
          <UIRadioGroup control={control} />
          <SubmitButton type="submit" variant="contained">
            Save
          </SubmitButton>
        </SettingForm>
      </Container>
    </DialogContainer>
  );
}

export default SettingDialog;
