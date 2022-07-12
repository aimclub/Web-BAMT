import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const TextFieldSignin = styled(TextField)({
  width: "100%",
  margin: "0 0 14px 0",
  fontSize: "24px",
  "& label": {
    color: "#90A4AE",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
  "& label.Mui-focused.Mui-error": {
    color: "#d32f2f",
  },
  "&.Mui-disabled label": {
    color: "rgba(0, 0, 0, 0.26)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#90A4AE",
  },
  "& :not(.Mui-error).MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #90A4AE",
    },
    "&:hover:not(.Mui-disabled) fieldset": {
      border: "1px solid #000",
    },
    "&.Mui-focused fieldset": {
      border: "2px solid #000",
    },
  },
  "& .Mui-disabled.MuiOutlinedInput-root": {
    background: "#ECEFF1",
    "& fieldset": {
      border: "1px solid #ECEFF1",
    },
  },
  "& .MuiInputLabel-root,& .MuiInputBase-root": {
    fontFamily: "'Open Sans'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "16px",
    textTransform: "capitalize",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "'Open Sans'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "120%",
    color: "#d32f2f",
  },
});

export default TextFieldSignin;
