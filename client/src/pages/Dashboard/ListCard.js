import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles/listCardStyles";
import NewListDialog from "../Dialogs/NewListDialog";

function ListCard({ image, name, amount, addCard, addItemList, itemLists }) {
  const history = useHistory();
  const [listName, setListName] = useState("");
  const [productList, setProductList] = useState([]);
  const [changedListName, setChangedListName] = useState(false);
  const [getProductListBool, setGetProductListBool] = useState(false);
  const [productListLoadedBool, setProductListLoadedBool] = useState(false);
  const [productAmount, setProductAmount] = useState(amount);

  const openNewList = () => {
    history.push("/dashboard/shoppingLists/create-new-list");
  };

  const openEditList = name => {
    console.log("Jump to EditList with ", name);

    setListName(name);
    setChangedListName(true);
    setGetProductListBool(true);
  };

  useEffect(() => {
    if (changedListName == true && getProductListBool == true) {
      //console.log("ListName changed to: ", listName);
      setChangedListName("false");

      fetch("/item-lists/get-product-list/?listName=" + listName, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(res => {
          setProductList(res.productList);
          setGetProductListBool(false);
          setProductListLoadedBool(true);
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (productListLoadedBool == true) {
      setProductListLoadedBool(false);
      history.push("/dashboard/shoppingLists/edit-list", {
        listName: listName,
        productList: productList
      });
    }
  });

  useEffect(() => {
    if (productListLoadedBool) setProductAmount(productList.length);
  }, [productListLoadedBool]);

  const classes = useStyles();
  return !addCard ? (
    <Card className={classes.card}>
      <CardActionArea onClick={() => openEditList(name)}>
        <CardMedia className={classes.cardImage} image={image} title={name} />
        <CardContent className={classes.content}>
          <Typography component="p">{name}</Typography>
          <Typography variant="body2" component="h1" color="textSecondary">
            {productAmount !== 1 ? `${productAmount} items` : "1 item"}
          </Typography>
        </CardContent>
      </CardActionArea>
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
        path="/dashboard/shoppingLists/create-new-list"
        render={() => {
          return <NewListDialog addItemList={addItemList} />;
        }}
      />
    </Card>
  );
}

export default ListCard;
