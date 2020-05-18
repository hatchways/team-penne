import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
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
  const [userProfile, setUserProfile] = useState("");
  const [newUserProfile, setNewUserProfile] = useState("");

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
      setUserProfile(props.getProfileInfo());
    }
  });

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        <Tab
          style={{ marginTop: "80px", height: "10vh" }}
          label="Edit Profile"
          {...a11yProps(0)}
        />
        <Tab style={{ height: "10vh" }} label="Edit Lists" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Container>
          Item One <Button onClick={changeUserProfile}>Apply Changes</Button>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
}

export default EditPage;
