import React, { useState } from "react";

import Navbar from "./navbar";
import ShoppingLists from "./shopping-lists";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <ShoppingLists />
    </>
  );
}
