import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

import { makeStyles } from "@material-ui/styles";
// import "./styles/nav.scss";

const profilePicImage =
  "https://i2-prod.mirror.co.uk/incoming/article10883656.ece/ALTERNATES/s615b/PROD-Lost-In-Space-Anniversary-party.jpg";

const useStyles = makeStyles({
  nav: {
    backgroundColor: "white",
    color: "black",
    display: "flex",
    justifyContent: "space-between"
  },
  alignLeft: {
    display: "block",
    margin: "auto",
    fontWeight: "lighter",
    letterSpacing: "4px",
    marginLeft: "20px",
    fontSize: "20px",
    cursor: "pointer",
    "& p": {
      "&:hover": {
        fontWeight: "bolder"
      }
    }
  },
  sameRow: {
    float: "left",
    marginTop: "10%",
    marginLeft: "20px"
  },
  alignRight: {
    display: "flex",
    flexDirection: "row",
    "& p": {
      marginRight: "20px",
      flexDirection: "row",
      "&:hover": {
        fontWeight: "normal"
      }
    }
  },
  circular: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
    marginRight: "15px",
    marginLeft: "30px",
    cursor: "pointer",
    "& img": {
      maxWidth: "100%",
      width: "auto",
      height: "auto",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }
  }
});
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
