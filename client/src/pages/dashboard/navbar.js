import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { ThemeProvider } from "@material-ui/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import { theme } from "../../themes/theme";
import "./styles.scss";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar className="nav">
        <WorkOutlineIcon color="primary" />
        <p>Deals Mate</p>
      </Toolbar>
    </AppBar>
  );
}
