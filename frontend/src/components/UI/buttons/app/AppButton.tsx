import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

interface IProps extends ButtonProps {
  to?: string;
}

const AppButton = styled((props: IProps) => {
  const linkProps = props.to
    ? { LinkComponent: Link, to: props.to }
    : undefined;

  return <Button {...props} {...linkProps} />;
})(({ theme, color }) => ({
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

  borderRadius: "4px",
  background: "#FFFFFF",
  color: color === "secondary" ? "#16A7E0" : theme.palette.primary.main,

  transition: "all 0.5s ease-in-out",

  "&:disabled": {
    color: "#E8E8E8",
  },
  "&:hover": {
    color: "#FFFFFF",
    background: theme.palette.primary.main,
  },
}));

export default AppButton;
