import React from "react";
import Navbar from "./navbar";
import ShoppingLists from "./ShoppingLists";
import { Route, BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import ProductConfirmation from "../Dialogs/ProductConfirmation";
import EditListDialog from "../Dialogs/EditListDialog";

function Dashboard(props) {
  return (
    <Container>
      <Navbar handleLogout={props.handleLogout} history={props.history} />
      <ShoppingLists />
      <Route
        path="/dashboard/confirm-product"
        component={ProductConfirmation}
      />
    </Container>
  );
}

export default Dashboard;
