import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Navbar from "./navbar";
import ShoppingLists from "./shopping-lists";
import NewListDialog from "../Dialogs/NewListDialog";
import NewProductDialog from "../Dialogs/NewProductDialog";
import EditList from "../Dialogs/EditList";
import ProductConfirmation from "../Dialogs/ProductConfirmation";

function Dashboard(props) {
  return (
    <>
      <Navbar handleLogout={props.handleLogout} history={props.history} />
      <ShoppingLists />
      <Route path="/dashboard/create-new-list" component={NewListDialog} />
      <Route path="/dashboard/add-new-product" component={NewProductDialog} />
      <Route path="/dashboard/edit-list" component={EditList} />
      <Route path="/dashboard/confirm-product" component={ProductConfirmation} />
    </>
  );
}

export default Dashboard;
