import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { FC } from "react";
import { cl } from "../../../../assets/utils/classnames";
import scss from "./textFieldForm.module.scss";

const CustomTextForm = styled(TextField)({
  "& .MuiInput-root": {
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.15px",

    // borderRadius: 0,
  },
  // "& .MuiOutlinedInput-input": {
  //   padding: 0,
  //   paddingBottom: 4,

  //   color: "#000000",

  //   "&::placeholder": {
  //     color: "#b0bec5",
  //   },
  // },
  // "& .MuiInputBase-multiline": {
  //   padding: 0,
  // },
  // "& .MuiInputBase-input": {
  //   padding: 0,
  //   paddingBottom: 4,
  // },

  // "& .MuiOutlinedInput-notchedOutline": {
  //   border: 0,
  //   borderBottom: "1px solid #F2F2F2",
  // },
  // "& :not(.Mui-error).Mui-focused .MuiOutlinedInput-notchedOutline": {
  //   borderBottom: "1px solid #000000",
  // },
  // "&:hover :not(.Mui-error).Mui-focused .MuiOutlinedInput-notchedOutline": {
  //   borderBottom: "1px solid #000000",
  // },
  // "& .MuiFormHelperText-root": {
  //   margin: "4px 0 0",
  // },
});

const TextFieldForm: FC<TextFieldProps> = ({ className, label, ...props }) => {
  return (
    <label className={cl(scss.root, className)}>
      <span className={scss.label}>{label || props.name}</span>
      <CustomTextForm variant="standard" {...props} />
    </label>
  );
};

export default TextFieldForm;
