import { createTheme } from "@mui/material/styles";
import { APP_COLOR } from "./constants";

export const theme = createTheme({
  palette: {
    primary: {
      main: APP_COLOR,
    },
  },
});
