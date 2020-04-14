import React from "react";
import Navbar from "./Navbar";
import ShoppingLists from "./ShoppingLists";
import { Container } from "@material-ui/core";

function Dashboard(props) {
  return (
    <Container>
      <Navbar handleLogout={props.handleLogout} history={props.history} />
      <ShoppingLists />
    </Container>
  );
}

export default Dashboard;
