import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles/listCardStyles";
import NewListDialog from "../Dialogs/NewListDialog";
import EditListDialog from "../Dialogs/EditListDialog";
import NewProductDialog from "../Dialogs/NewProductDialog";

function ListCard({ image, name, amount, addCard, addItemList, itemLists }) {
  const history = useHistory();
  const [listName, setListName] = useState("");
  const [changedListName, setChangedListName] = useState("false");

  const openNewList = () => {
    history.push("/dashboard/create-new-list");
  };

  const openEditList = (name) => {
    console.log("Jump to EditList with ", name);

    setListName(name);
    setChangedListName("true");
  };

  useEffect(() => {
    if (changedListName === "true") {
      console.log("ListName changed to: ", listName);
      setChangedListName("false");
      history.push("/dashboard/edit-list", { name: listName });
    }
  });

  const classes = useStyles();
  return !addCard ? (
    <Card className={classes.card}>
      <CardActionArea onClick={() => openEditList(name)}>
        <CardMedia className={classes.cardImage} image={image} title={name} />
        <CardContent className={classes.content}>
          <Typography component="p">{name}</Typography>
          <Typography variant="body2" component="h1" color="textSecondary">
            {amount !== 1 ? `${amount} items` : "1 item"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Route
        path="/dashboard/edit-list"
        render={() => {
          return <EditListDialog listName={listName} />;
        }}
      />
      <Route
        path="/dashboard/add-new-product"
        render={() => {
          return <NewProductDialog itemLists={itemLists} />;
        }}
      />
    </Card>
  ) : (
    <Card className={classes.addCard}>
      <CardActionArea onClick={openNewList}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <AddIcon fontSize="large" color="primary" />
          <Typography className={classes.addListCardText} component="h1">
            ADD NEW LIST
          </Typography>
        </Box>
      </CardActionArea>
      <Route
        path="/dashboard/create-new-list"
        render={() => {
          return <NewListDialog addItemList={addItemList} />;
        }}
      />
    </Card>
  );
}

export default ListCard;
