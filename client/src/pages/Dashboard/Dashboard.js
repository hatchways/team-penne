import React from "react";

import Navbar from "./navbar";
import ShoppingLists from "./shopping-lists";

function Dashboard(props) {
  return (
    <>
      <Navbar handleLogout={props.handleLogout} history={props.history} />
      <ShoppingLists />
    </>
  );
}

export default Dashboard;
