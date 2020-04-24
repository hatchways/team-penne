import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import profilePageStyles from "./Styles/profilePageStyles";
import profilePic from "../../assets/noUserProfilePic.png";

export default function ProfilePage() {
  const classes = profilePageStyles();
  const history = useHistory();
  const userName = history.location.state.userName;
  const userEmail = history.location.state.userEmail;
  const userImageURL = history.location.state.userImageURL;
  let pic;

  if (!userImageURL) {
    pic = profilePic;
  } else {
    pic = userImageURL;
  }

  return (
    <Container classes={{ root: classes.container }}>
      <Typography variant="h3">{userName}</Typography>
      <Container classes={{ root: classes.imageContainer }}>
        <img src={pic} />
      </Container>
      <Typography variant="h5">{userEmail}</Typography>
    </Container>
  );
}
