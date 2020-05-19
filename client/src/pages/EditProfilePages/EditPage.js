import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import TabPanel from "./TabPanel.js";
import editPageStyles from "./styles/EditPageStyles";
import noUserProfilePic from "../../assets/noUserProfilePic.png";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

function EditPage(props) {
  const classes = editPageStyles();
  const [firstLoad, setFirstLoad] = useState(true);
  const [value, setValue] = useState(0);
  const [newUserProfile, setNewUserProfile] = useState(props.getProfileInfo());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeUserProfile = () => {
    // make a post command to send the new user data to
    props.setUserProfile({
      userName: "Spongebob Squarepants",
      userEmail: "ssquarepants@bb.com",
      profilePicImage: noUserProfilePic
    });
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      setNewUserProfile(props.getProfileInfo());
    }
  });

  return (
    <div className={classes.root}>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          marginTop: "2vh",
          marginBottom: "2vh",
          paddingLeft: "10px"
        }}
      >
        <div style={{ marginTop: "80px", height: "10vh" }}>
          <Typography variant="h5">Edit Settings</Typography>
        </div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          className={classes.tabs}
        >
          <Tab style={{ height: "10vh" }} label="Profile" {...a11yProps(0)} />
          <Tab style={{ height: "10vh" }} label="Lists" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <div className={classes.tabContainer}>
          <Typography variant="h5" component="h2">
            General Account Settings
          </Typography>
          Profile Picture: <br />
          {
            <img
              className={classes.profilePicture}
              src={props.getProfileInfo().profilePicImage}
            />
          }{" "}
          <br />
          Username: {props.getProfileInfo().userName} <br />
          Email: {props.getProfileInfo().userEmail} <br />
          <Button onClick={changeUserProfile}>Apply Changes</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.tabContainer}>
          <Typography variant="h5" component="h2">
            Account List Settings
          </Typography>
        </div>
      </TabPanel>
    </div>
  );
}

export default EditPage;
