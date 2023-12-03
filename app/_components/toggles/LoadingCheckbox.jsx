import { Checkbox } from "@mui/material";
import { ControlBox } from "@/app/_components/_styles/boxes/ControlBox";
import { CheckboxLoading } from "@/app/_components/_styles/progress/circular/BaseCircularProgress";

export default function LoadingCheckbox({ isLoading, checked, handleChange }) {
    return (
      <ControlBox>
        <Checkbox
          checked={checked}
          onChange={() => handleChange()}
          sx={{
            visibility: isLoading ? "hidden" : "visible",
          }}
        />
        {isLoading && <CheckboxLoading size={24} />}
      </ControlBox>
    );
  }