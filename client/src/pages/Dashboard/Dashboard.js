import React, { useEffect } from "react";
import Navbar from "./navbar";
import ShoppingLists from "./ShoppingLists";
import { Route, BrowserRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import ProductConfirmation from "../Dialogs/ProductConfirmation";
import socketIOClient from "socket.io-client";
require("dotenv").config();

function Dashboard(props) {
  useEffect(() => {
    const socket = socketIOClient(process.env.ENDPOINT);
  }, []);

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
