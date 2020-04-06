import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 14,
  },
  palette: {
    primary: { main: "#DF1B1B" },
    secondary: { main: "rgb(192,192,192)" },
    background: {
      default: "#FBFCFF",
    },
  },
});
