import React from "react";

import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";

import "./styles/shopping-lists.scss";

const lists = ["Shoes", "Video Games", "Food", "Clothes", "Toiletries"];

export default function ShoppingLists() {
  return (
    <div className="dash-body">
      <div className="dash-body__new-item">
        <p>Add new item:</p>
        <div className="dash-body__new-item__input">
          <input placeholder="Paste your link here" />
          <div className="vertical-line" />
          <FormControl>
            <InputLabel>Select list</InputLabel>
            <Select disableUnderline={true} placeholder="Select list" fullWidth>
              {lists.map(list => (
                <MenuItem>{list}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
