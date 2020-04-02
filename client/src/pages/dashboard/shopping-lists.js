import React from "react";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
  Divider
} from "@material-ui/core";

import ListCard from "./list-card.js";
import { makeStyles } from "@material-ui/styles";

// import "./styles/shopping-lists.scss";

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

const useStyles = makeStyles({
  dashBody: {
    display: "flex",
    justifyContent: "center"
  },
  newItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7vh",
    "& p": {
      textAlign: "center"
    }
  },
  input: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "530px",
    width: "60vw",
    height: "70px",
    borderRadius: "50px 50px 50px 50px",
    backgroundColor: "white",
    paddingLeft: "30px",
    "& input": {
      background: "transparent",
      width: "25vw",
      border: "none",
      fontSize: "20px",
      color: "rgb(192, 192, 192)",
      "&:focus": {
        outline: "none"
      },
      "&::placeholder": {
        color: "rgb(192, 192, 192)"
      }
    },
    "& button": {
      marginRight: "30px",
      borderRadius: "50px 50px 50px 50px",
      width: "170px",
      margin: "10px 20px 10px 10px"
    }
  },
  verticalLine: {
    borderLeft: "solid thin rgb(212,212,212)",
    marginRight: "14px",
    marginLeft: "-20px"
  },
  InputLabel: {
    width: "100px"
  }
});

export default function ShoppingLists() {
  const classes = useStyles();
  return (
    <div className={classes.dashBody}>
      <div className={classes.newItem}>
        <p>Add new item:</p>
        <div className={classes.input}>
          <input placeholder="Paste your link here" />
          <div className={classes.verticalLine} />
          <FormControl>
            <Box display="flex" justifyContent="center" width={100}>
              <InputLabel className={classes.InputLabel}>
                Select list
              </InputLabel>
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
            </Box>
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
