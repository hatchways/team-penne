import React from "react";
import Navbar from "./navbar";
import ShoppingLists from "./ShoppingLists";
import { Route, BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import ProductConfirmation from "../Dialogs/ProductConfirmation";

function Dashboard(props) {
  return (
    <Container>
      <Navbar
        currentTab={"Home"}
        handleLogout={props.handleLogout}
        history={props.history}
      />
      <ShoppingLists />
      <Route
        path="/dashboard/confirm-product"
        component={ProductConfirmation}
      />
    </Container>
  );
}

export default Dashboard;
