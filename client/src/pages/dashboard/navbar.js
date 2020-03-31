import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import "./styles/nav.scss";

const profilePicImage =
  "https://i2-prod.mirror.co.uk/incoming/article10883656.ece/ALTERNATES/s615b/PROD-Lost-In-Space-Anniversary-party.jpg";

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
          <div className="circular">
            <img src={profilePicImage} alt="profile-pic" />
          </div>
          <p>Profile</p>
        </div>
      </Toolbar>
    </AppBar>
  );
}
