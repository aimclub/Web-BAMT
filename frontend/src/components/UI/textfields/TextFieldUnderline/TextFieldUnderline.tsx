import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import cl from "classnames";
import { FC } from "react";
import scss from "./textFieldUnderline.module.scss";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
  },
  "& .MuiOutlinedInput-input": {
    padding: 0,
    paddingBottom: 4,

    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.15px",

    color: "#000000",

    "&::placeholder": {
      color: "#E8E8E8",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    padding: 0,
    paddingBottom: 4,

    border: 0,
    borderBottom: "1px solid #F2F2F2",
  },
  "& :not(.Mui-error).Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderBottom: "1px solid #000000",
  },
  "&:hover :not(.Mui-error).Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderBottom: "1px solid #000000",
  },
  "& .MuiFormHelperText-root": {
    margin: "4px 0 0",
  },
});

const TextFieldUnderline: FC<TextFieldProps> = ({
  className,
  label,
  ...props
}) => {
  return (
    <div className={cl(scss.root, className)}>
      <p className={scss.label}>{label || props.name}</p>
      <CustomTextField {...props} />
    </div>
  );
};

export default TextFieldUnderline;
