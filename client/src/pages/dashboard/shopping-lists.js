import React, { useState } from "react";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
  Typography
} from "@material-ui/core";

import ListCard from "./list-card.js";
import useStyles from "./styles/shopping-lists-styles";

// Dummy data for lists
const lists = [
  {
    name: "Shoes",
    amount: 2,
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
  const classes = useStyles();
  const [list, setList] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleListChange = e => {
    setList(e.target.value);
  };

  const handleUrlChange = e => {
    setUrl(e.target.value);
  };

  return (
    <div className={classes.dashBody}>
      <div className={classes.newItem}>
        <Typography variant="h5">Add new item:</Typography>
        <div className={classes.input}>
          <input
            onChange={handleUrlChange}
            placeholder="Paste your link here"
          />
          <Box display="flex">
            <div className={classes.verticalLine} />
            <FormControl>
              <Box display="flex" justifyContent="center" width={110}>
                <InputLabel className={classes.InputLabel}>
                  <Typography color="secondary">Select list</Typography>
                </InputLabel>
                <Select
                  style={{ color: "rgb(192,192,192)" }}
                  autoWidth={true}
                  disableUnderline={true}
                  placeholder="Select list"
                  color="secondary"
                  variant="outlined"
                  value={list}
                  onChange={handleListChange}
                  open={open}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  fullWidth
                >
                  {lists.map(list => (
                    <MenuItem value={list.name}>{list.name}</MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
          </Box>
          <Button variant="contained" color="primary">
            Add
          </Button>
        </div>
        <div className={classes.listCards}>
          <Box ml={5} mt={5}>
            <div className={classes.cardsTitleLeft}>
              <Typography variant="h5">My Shopping Lists:</Typography>
            </div>
            <Grid container spacing={18}>
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
          </Box>
        </div>
      </div>
    </div>
  );
}
