import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import ShoppingLists from "./ShoppingLists";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import FollowersPage from "../../pages/Followers/Followers";
import EditProfilePage from "../../pages/EditProfilePages/EditPage";
import ProfilePage from "../Profile/ProfilePage";
import noUserProfilePic from "../../assets/noUserProfilePic.png";

// add reroute
function Dashboard(props) {
  const [userProfile, setUserProfile] = useState("");

  const getProfileInfo = () => {
    return userProfile;
  };

  const changeUserProfile = newProfile => {
    console.log("Changing userProfile to:");
    console.log(newProfile);
    setUserProfile(newProfile);
  };

  useEffect(() => {
    if (userProfile == "") {
      fetch("/userprofile")
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(res => {
          if (res.userImageURL == null) {
            setUserProfile({
              userName: res.userName,
              userEmail: res.userEmail,
              profilePicImage: noUserProfilePic
            });
          } else {
            setUserProfile({
              userName: res.userName,
              userEmail: res.userEmail,
              profilePicImage: res.userImageURL
            });
          }
        });
    }
  });

  return (
    <Container>
      <Redirect
        to={{
          pathname: "/dashboard/shoppingLists",
          state: { from: "/dashboard" }
        }}
      />
      <Navbar
        currentTab={"shoppingLists"}
        handleLogout={props.handleLogout}
        history={props.history}
        getProfileInfo={getProfileInfo}
        setUserProfile={changeUserProfile}
      />
      <Route
        path="/dashboard/followers"
        component={FollowersPage}
        handleLogout={props.handleLogout}
        history={props.history}
      />
      <Route
        path="/dashboard/edit-page"
        component={() => (
          <EditProfilePage
            history={props.history}
            getProfileInfo={getProfileInfo}
            setUserProfile={changeUserProfile}
          />
        )}
      />
      <Route path="/dashboard/profile/:userId" component={ProfilePage} />
      <Route
        path="/dashboard/shoppingLists"
        component={ShoppingLists}
        handleLogout={props.handleLogout}
        history={props.history}
      />
    </Container>
  );
}

export default Dashboard;
