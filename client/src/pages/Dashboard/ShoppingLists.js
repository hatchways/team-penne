import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useHistory } from "react-router";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  FormControl,
  Grid,
  Select,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import ListCard from "./ListCard.js";
import useStyles from "./styles/shoppingListsStyles";
import ProductConfirmation from "../Dialogs/ProductConfirmation";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import EditListDialog from "../Dialogs/EditListDialog";
import NewProductDialog from "../Dialogs/NewProductDialog";

export default function ShoppingLists(props) {
  const classes = useStyles();
  const timer = React.useRef();
  const history = useHistory();

  const [itemLists, setItemLists] = useState([]);
  const [list, setList] = useState("");
  const [productUrl, setProductUrl] = React.useState("");
  const [open, setOpen] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loadingButtonLabel, setLoadingButtonLabel] = React.useState(
    "ADD ITEM"
  );
  const [productUrlError, setProductUrlError] = React.useState(false);
  const [listError, setListError] = React.useState(false);
  const [loadErr, setLoadErr] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleListChange = e => {
    setList(e.target.value);
  };

  const handleUrlChange = e => {
    setProductUrl(e.target.value);
  };

  const handleButtonClick = () => {
    getProductFromUrl();
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  // PRODUCT/LIST VERIFICATION
  const listVerification = () => {
    if (list != "") {
      setListError(false);
      return true;
    }
    setListError(true);
    setErrorMessage("Error: A list needs to be selected.");
    return false;
  };
  const productUrlVerification = () => {
    if (productUrl.length > 0) {
      // there's no error
      setProductUrlError(false);
      return true;
    }
    // there IS an error
    setErrorMessage("Error: Product URL format is invalid.");
    setProductUrlError(true);
    return false;
  };

  const verificationCheck = () => {
    const prodValid = productUrlVerification();
    const listValid = listVerification();
    if (prodValid && listValid) {
      return true;
    }
    if (!prodValid && !listValid) {
      setErrorMessage(
        "Error: There was an error loading your product and a list needs to be selected."
      );
    }
    return false;
  };

  const getProductFromUrl = () => {
    if (verificationCheck()) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoadErr(true);
        setErrorMessage(
          "Your product is taking longer to load than usual. Please keep waiting, or refresh the page."
        );
      }, 5000);
      localStorage.setItem("productUrl", productUrl);
      fetch("/api/scrape/?url=" + productUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then(res => {
          setLoading(false);
          setSuccess(true);
          clearInterval(timer.current);
          setLoadingButtonLabel("ADDING ITEM");
          timer.current = setTimeout(() => {
            history.push("/dashboard/shoppingLists/confirm-product", {
              productTitle: res.title,
              productCurrency: res.currency,
              productPrice: res.price,
              productImageURL: res.imageURL,
              productSale: res.sale,
              productSalePrice: res.salePrice,
              productURL: productUrl,
              productId: res.productId,
              listName: list
            });
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setSuccess(false);
          setLoadErr(true);
          setErrorMessage(
            "Error: There was an error loading your product. Please check the link and try again."
          );
          setLoadingButtonLabel("ADD ITEM");
        });
    } else {
      setLoading(false);
      setSuccess(false);
    }
  };

  const getItemLists = () => {
    fetch("/itemLists/getLists", {
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
        setItemLists(res.itemLists);
        localStorage.setItem("itemLists", JSON.stringify(res.itemLists));
      })
      .catch(err => {
        console.log(err);
        return;
      });
  };

  const addItemList = (name, image) => {
    fetch("/itemLists/addLists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        listName: name,
        listPicture: image
      })
    })
      .then(() => {
        getItemLists();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!firstLoad) {
      getItemLists();
      setFirstLoad(true);
    }
  }, [firstLoad]);

  return (
    <div className={classes.dashBody}>
      <Route
        path="/dashboard/shoppingLists/confirm-product"
        component={ProductConfirmation}
      />
      <Route
        path="/dashboard/shoppingLists/edit-list"
        render={() => {
          return <EditListDialog />;
        }}
      />
      <Route
        path="/dashboard/shoppingLists/add-new-product"
        render={() => {
          return <NewProductDialog itemLists={itemLists} />;
        }}
      />
      <div className={classes.newItem}>
        <Typography variant="h5">Add new item:</Typography>
        <div className={classes.input}>
          <input
            onChange={handleUrlChange}
            style={{ fontSize: "14pt" }}
            placeholder="Paste your link here"
          />
          <Box display="flex">
            <div className={classes.verticalLine} />
            <FormControl
              style={{
                display: "flex",
                justifyContent: "center",
                width: 150
              }}
            >
              <Select
                labelId="select-product-list-label"
                id="select-product-list"
                disableUnderline={true}
                native
                onChange={handleListChange}
                value={list}
                autoWidth
                className={classes.selectDropdown}
              >
                {itemLists.length == 0 && (
                  <option value={list.name}>No Lists yet</option>
                )}
                {itemLists.length != 0 && (
                  <option value="" disabled selected hidden>
                    Select List
                  </option>
                )}
                {itemLists.length != 0 &&
                  itemLists.map(list => (
                    <option className={classes.selectText} value={list.name}>
                      {list.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleButtonClick}
            className={buttonClassname}
            disabled={loading}
          >
            {loadingButtonLabel}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </div>
        <Collapse in={productUrlError || loadErr || listError}>
          <Alert classes={{ root: classes.alert }} severity="error">
            {errorMessage}
          </Alert>
        </Collapse>
        <div className={classes.listCards}>
          <Box ml={5} mt={5}>
            <div className={classes.cardsTitleLeft}>
              <Typography variant="h5">My Shopping Lists:</Typography>
            </div>
            <Grid container spacing={18}>
              {itemLists.map(list => {
                return (
                  <ListCard
                    image={list.image}
                    name={list.name}
                    amount={list.amount}
                    itemLists={itemLists}
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
