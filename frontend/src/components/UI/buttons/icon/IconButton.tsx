import MUIButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const IconButton = styled(MUIButton)({
  borderRadius: 8,
  color: "#000000",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "all 0.5s ease-in-out",

  "&:hover": {
    color: "#86BD24",
    background: "transparent",
  },
});

export default IconButton;
