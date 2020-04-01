import React from "react";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid
} from "@material-ui/core";

import ListCard from "./list-card.js";

import "./styles/shopping-lists.scss";

// Dummy data for lists
const lists = [
  {
    name: "Shoes",
    amount: 12,
    image: "https://m.media-amazon.com/images/I/81eA2SDaGcL._AC_255_.jpg"
  },
  {
    name: "Video Games",
    amount: 51,
    image:
      "https://cnet4.cbsistatic.com/img/0EX8LMQJ2T0L65MB_V6vyI2D1RA=/1200x675/2019/11/04/2f494437-c7dd-4a4c-ac0b-aab7a93d996e/p1005326-2.jpg"
  },
  {
    name: "Food",
    amount: 61,
    image:
      "https://4.bp.blogspot.com/-1PPIpuTPnPY/UCudijf1DPI/AAAAAAAABgY/Ohzq0co9uyk/s1600/generic.jpg"
  },
  {
    name: "Clothes",
    amount: 32,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  },
  {
    name: "Toiletries",
    amount: 43,
    image:
      "https://www.travelfashiongirl.com/wp-content/uploads/2017/09/ultimate-guide-to-travel-toiletries-010.jpg"
  }
];

export default function ShoppingLists() {
  return (
    <div className="dash-body">
      <div className="dash-body__new-item">
        <p>Add new item:</p>
        <div className="dash-body__new-item__input">
          <input placeholder="Paste your link here" />
          <FormControl>
            <div className="vertical-line" />
            <InputLabel>Select list</InputLabel>
            <Select
              autoWidth={true}
              disableUnderline={true}
              placeholder="Select list"
              fullWidth
            >
              {lists.map(list => (
                <MenuItem>{list.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Add
          </Button>
        </div>
        <div className="dash-body__new-item__list-cards">
          <div className="cards-title-left">
            <p>My Shopping Lists:</p>
          </div>

          <Grid container spacing={3}>
            {lists.map(list => {
              return (
                <ListCard
                  image={list.image}
                  name={list.name}
                  amount={list.amount}
                />
              );
            })}
            <ListCard addCard={true} />
          </Grid>
        </div>
      </div>
    </div>
  );
}
