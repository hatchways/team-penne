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
  Typography,
} from "@material-ui/core";
import dialogStyles from "./Styles/dialogStyles";

function EditListDialog(props) {
  const [listName, setListName] = React.useState(props.listName);
  const [itemListLoaded, setItemListLoaded] = React.useState(false);
  const [productList, setProductList] = React.useState([]);

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

  fetch("/itemLists/getProductList/?listName=" + listName, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((res) => {
      setProductList(res.productList);
    })
    .catch((err) => {
      console.log(err);
      setItemListLoaded(false);
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
        {productList.map((listItem) => (
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
                  />
                </div>
                <div className={classes.cardTextBox}>
                  <Typography
                    className={classes.cardTitle}
                    color="textSecondary"
                    gutterBottom
                  >
                    <Truncate width={100 * 6}>{listItem.productName}</Truncate>
                  </Typography>
                  <Typography className={classes.cardURL} gutterBottom>
                    <Truncate width={100 * 3}>{listItem.productURL}</Truncate>
                  </Typography>
                  <h5>
                    {listItem.productCurrency}
                    {listItem.productPrice}
                  </h5>
                  <h5>
                    {listItem.productSalePrice != null &&
                      listItem.productCurrency}
                    {listItem.productSalePrice != null &&
                      listItem.productSalePrice}
                  </h5>
                </div>
              </div>
              <Button
                classes={{ outlined: classes.removeButton }}
                size="large"
                variant="outlined"
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
