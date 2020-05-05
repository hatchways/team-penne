import React, { useEffect } from "react";
import Navbar from "./navbar";
import ShoppingLists from "./ShoppingLists";
import { Route, Redirect, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import FollowersPage from "../../pages/Followers/Followers";
import ProfilePage from "../Profile/ProfilePage";

// add reroute
function Dashboard(props) {
  return (
    <Container>
      <Redirect
        to={{
          pathname: "/dashboard/shoppingLists",
          state: { from: "/dashboard" },
        }}
      />
      <Navbar
        currentTab={"shoppingLists"}
        handleLogout={props.handleLogout}
        history={props.history}
      />
      <Route
        path="/dashboard/followers"
        component={FollowersPage}
        handleLogout={props.handleLogout}
        history={props.history}
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
