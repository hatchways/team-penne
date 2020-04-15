import React, { useState } from "react";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";

import ListCard from "./ListCard.js";
import useStyles from "./styles/shoppingListsStyles";

export default function ShoppingLists() {
  const classes = useStyles();
  const [itemLists, setItemLists] = useState([]);
  const [list, setList] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const handleListChange = (e) => {
    setList(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const getItemLists = () => {
    fetch("/itemLists/getLists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        console.log("itemLists: " + res.itemLists);
        setItemLists(res.itemLists);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const addItemList = (name, image) => {
    fetch("/itemLists/addLists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listName: name,
        listPicture: image,
      }),
    }).then(() => {
      getItemLists();
    });
  };

  if (!firstLoad) {
    getItemLists();
    setFirstLoad(true);
  }

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
                  value={list}
                  onChange={handleListChange}
                  open={open}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                  fullWidth
                >
                  {itemLists.map((list) => (
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
              {itemLists.map((list) => {
                return (
                  <ListCard
                    image={list.image}
                    name={list.name}
                    amount={list.amount}
                  />
                );
              })}
              <ListCard addCard={true} addItemList={addItemList} />
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}
