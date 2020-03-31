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
        <div id="align-left">
          <WorkOutlineIcon className="same-row" color="primary" />
          <p className="same-row">Deals Mate</p>
        </div>
        <div id="align-right">
          <p>Shopping Lists</p>
          <p>Friends</p>
          <p>Notifications</p>
        </div>
      </Toolbar>
    </AppBar>
  );
}
