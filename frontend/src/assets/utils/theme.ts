import { createTheme } from "@mui/material/styles";

import { ModelType } from "../../types/model";

export const getModelColor = (model: ModelType) =>
  model === "social" ? "#16A7E0" : "#86BD24";

export const createModelTheme = (model: ModelType) =>
  createTheme({
    palette: {
      primary: {
        main: getModelColor(model),
      },
    },
  });

export const theme = createTheme({
  palette: {
    primary: {
      main: "#b0bec5",
    },
  },
});
