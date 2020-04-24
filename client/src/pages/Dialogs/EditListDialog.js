import React, { useEffect } from "react";
import Truncate from "react-truncate";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from "@material-ui/core";
import dialogStyles from "./Styles/dialogStyles";

function EditListDialog() {
  const [listName, setListName] = React.useState("");
  const [productList, setProductList] = React.useState([]);
  const [productListRetrieved, setProductListRetrieved] = React.useState(false);

  const classes = dialogStyles();
  const history = useHistory();

  const handleClose = () => {
    history.push(window.location.pathname.replace("/edit-list", ""));
  };

  // add anymore product validation
  const redirectToNewProduct = () => {
    history.push(
      window.location.pathname.replace("/edit-list", "/add-new-product")
    );
  };

  const addDecimalPlacesPrice = price => {
    var upperPriceString = price.toString();
    if (upperPriceString.split(".")[1] == null) {
      upperPriceString = upperPriceString + ".00";
    }
    if (upperPriceString.split(".")[1].length < 2) {
      upperPriceString = upperPriceString + "0";
    }
    return upperPriceString;
  };

  const handleRemove = listItem => {
    console.log(listItem);
    history.push(
      window.location.pathname.replace("/edit-list", "/remove-product"),
      {
        productId: listItem.productId,
        productName: listItem.productName,
        productImageURL: listItem.productImageURL,
        productURL: listItem.productURL,
        productCurrency: listItem.productCurrency,
        productPrice: listItem.productPrice,
        productSalePrice: listItem.productSalePrice,
        listName: listName
      }
    );
  };

  useEffect(() => {
    setListName(history.location.state.listName);
    setProductList(history.location.state.productList);
  });

  return (
    <Dialog
      scroll="paper"
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={true}
    >
      <DialogTitle
        classes={{ root: classes.dialogTitle }}
        id="form-dialog-title"
      >
        {listName}
        <Typography variant="body2" component="h1" color="textSecondary">
          {productList.length} items
        </Typography>
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        {productList.map(listItem => (
          <Card
            className={classes.cardManager}
            raised={true}
            value={listItem.productName}
          >
            <CardActions>
              <div className={classes.cardDivider}>
                <div className={classes.cardImageBox}>
                  <img
                    src={listItem.productImageURL}
                    className={classes.cardImg}
                    onClick={() => window.open(listItem.productURL, "_blank")}
                  />
                </div>
                <div className={classes.cardTextBox}>
                  <div
                    onClick={() => window.open(listItem.productURL, "_blank")}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography
                      className={classes.cardTitle}
                      color="textSecondary"
                      gutterBottom
                    >
                      <Truncate width={100 * 6}>
                        {listItem.productName}
                      </Truncate>
                    </Typography>
                    <Typography className={classes.cardURL} gutterBottom>
                      <Truncate width={100 * 3}>{listItem.productURL}</Truncate>
                    </Typography>
                  </div>
                  {listItem.productPrice == 0 && ( // if product is unavailable
                    <div
                      style={{ marginTop: 20, fontSize: "12px", color: "red" }}
                    >
                      Sorry, your product is currently unavailable.
                    </div>
                  )}
                  {listItem.productPrice != 0 && ( // if product is available
                    <div style={{ marginTop: 30 }}>
                      {listItem.productSalePrice != null && (
                        <div className={classes.strikeThroughText}>
                          {listItem.productCurrency}
                          {addDecimalPlacesPrice(listItem.productPrice)}
                        </div>
                      )}
                      {listItem.productSalePrice != null && (
                        <div style={{ fontWeight: "bold" }}>
                          {listItem.productCurrency}
                          {addDecimalPlacesPrice(listItem.productSalePrice)}
                        </div>
                      )}
                      {listItem.productSalePrice == null && (
                        <div>
                          {listItem.productCurrency}
                          {addDecimalPlacesPrice(listItem.productPrice)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Button
                classes={{ outlined: classes.removeButton }}
                size="large"
                variant="outlined"
                onClick={() => {
                  handleRemove(listItem);
                }}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        ))}
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Button
          classes={{ contained: classes.button }}
          onClick={redirectToNewProduct}
          variant="contained"
          size="large"
        >
          ADD NEW ITEM
        </Button>
      </DialogActions>
      <Divider classes={{ root: classes.divider }} />
    </Dialog>
  );
}

export default EditListDialog;
