import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import useStyles from "./styles/navbar-styles";

const profilePicImage =
  "https://i2-prod.mirror.co.uk/incoming/article10883656.ece/ALTERNATES/s615b/PROD-Lost-In-Space-Anniversary-party.jpg";

export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.nav}>
        <div className={classes.alignLeft}>
          <WorkOutlineIcon className={classes.sameRow} color="primary" />
          <p className={classes.sameRow}>Deals Mate</p>
        </div>
        <div className={classes.alignRight}>
          <p>Shopping Lists</p>
          <p>Friends</p>
          <p>Notifications</p>
          <div className={classes.circular}>
            <img src={profilePicImage} alt="profile-pic" />
          </div>
          <p>Profile</p>
        </div>
      </Toolbar>
    </AppBar>
  );
}
