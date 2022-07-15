import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const PopupButton = styled(Button)({
  padding: 20,
  width: "100%",

  fontFamily: "'Open Sans'",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "18px",
  letterSpacing: "0.25px",
  textAlign: "center",
  textTransform: "uppercase",
  textDecoration: "none",

  borderRadius: 0,
  background: "#FFFFFF",
  color: "#000000",

  transition: "all 0.5s ease-in-out",

  "&:disabled": {
    color: "#dadada",
  },
  "&:hover": {
    color: "#B0BEC5",
    background: "#f1f3f5",
  },
});

export default PopupButton;
