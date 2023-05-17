import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { FC, memo } from "react";
import { cl } from "../../../../assets/utils/classnames";
import scss from "./textFieldForm.module.scss";

// TODO: style textfield
const CustomTextForm = styled(TextField)({
  "& .MuiInputBase-input": {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: "0.15px",
  },

  "& .MuiInputBase-root": {
    "&:not(.Mui-disabled):hover": {
      "&::before": {
        borderWidth: 1,
        borderColor: "#000",
      },
      "&:not(.Mui-focused).MuiOutlinedInput-notchedOutline": {
        borderColor: "#000",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    margin: "2px 0 0",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: 12,
    lineHeight: "16px",
  },
});

const TextFieldForm: FC<TextFieldProps> = ({ className, label, ...props }) => {
  return (
    <label className={cl(scss.root, className)}>
      <span className={scss.label}>{label || props.name}</span>
      <CustomTextForm variant="standard" {...props} />
    </label>
  );
};

export default memo(TextFieldForm);
