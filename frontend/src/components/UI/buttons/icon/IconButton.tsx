import MUIButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const IconButton = styled(MUIButton)({
  borderRadius: 8,
  color: "#000000",

  transition: "all 0.5s ease-in-out",

  "&:hover": {
    color: "#B0BEC5",
    background: "transparent",
  },
});

export default IconButton;
