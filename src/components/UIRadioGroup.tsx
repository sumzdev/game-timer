import { Control, Controller } from "react-hook-form";
import styled from "@emotion/styled";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { UI_TYPE } from "../constants/mode";
import { UIOption } from ".";
import { SettingFormFields } from "./SettingDialog";

interface UIRadioGroupProps {
  control: Control<SettingFormFields>;
}

const Container = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 20px;
  margin-top: 30px;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function UIRadioGroup({ control }: UIRadioGroupProps) {
  return (
    <Controller
      control={control}
      name="uiType"
      render={({ field }) => (
        <Container {...field}>
          <RadioWrapper>
            <UIOption uiType={UI_TYPE[1]} />
            <FormControlLabel
              value={UI_TYPE[1]}
              control={<Radio />}
              label=""
              labelPlacement="top"
            />
          </RadioWrapper>
          <RadioWrapper>
            <UIOption uiType={UI_TYPE[2]} />

            <FormControlLabel
              value={UI_TYPE[2]}
              control={<Radio />}
              label=""
              labelPlacement="top"
            />
          </RadioWrapper>
          <RadioWrapper>
            <UIOption uiType={UI_TYPE[3]} />

            <FormControlLabel
              value={UI_TYPE[3]}
              control={<Radio />}
              label=""
              labelPlacement="top"
            />
          </RadioWrapper>
        </Container>
      )}
    />
  );
}

export default UIRadioGroup;
