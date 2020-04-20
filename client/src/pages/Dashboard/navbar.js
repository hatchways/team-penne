import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Button } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "./styles/navbarStyles";
import logo from "../../assets/logo.png";
import socketIOClient from "socket.io-client";
require("dotenv").config();

const profilePicImage =
  "https://i2-prod.mirror.co.uk/incoming/article10883656.ece/ALTERNATES/s615b/PROD-Lost-In-Space-Anniversary-party.jpg";

function Navbar(props) {
  const classes = useStyles();

  const handleLogout = () => {
    fetch("/logout").then(res => {
      if (res.status === 200) {
        const socket = socketIOClient(process.env.ENDPOINT);
        localStorage.clear();
        props.history.push("/");
        props.handleLogout();
        socket.close(function(socket) {
          console.log("socket closed");
        });
      }
    });
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.nav}>
        <div className={classes.alignLeft}>
          <img src={logo} alt="" />
        </div>
        <div className={classes.alignRight}>
          <p>Shopping Lists</p>
          <p>Friends</p>
          <p>Notifications</p>
          <Button onClick={handleLogout}>Logout</Button>
          <div className={classes.circular}>
            <img src={profilePicImage} alt="profile-pic" />
          </div>
          <p>Profile</p>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
