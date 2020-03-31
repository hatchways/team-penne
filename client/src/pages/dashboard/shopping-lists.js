import React from "react";

import "./styles/shopping-lists.scss";

export default function ShoppingLists() {
  return (
    <div className="dash-body">
      <div className="dash-body__new-item">
        <p>Add new item:</p>
        <div className="dash-body__new-item__input">
          <input placeholder="Paste your link here" />
          <div className="vertical-line" />
        </div>
      </div>
    </div>
  );
}
