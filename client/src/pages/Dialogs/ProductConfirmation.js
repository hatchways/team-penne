import React from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import {
  Card,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import Truncate from "react-truncate";
import dialogStyles from "./Styles/dialogStyles";

function ProductConfirmationDialog() {
  const classes = dialogStyles();
  const history = useHistory();

  // state declaration
  const [loadingDeny, setLoadingDeny] = React.useState(false);
  const [loadingConfirm, setLoadingConfirm] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [
    loadingButtonLabelConfirm,
    setLoadingButtonLabelConfirm,
  ] = React.useState("CONFIRM");
  const [loadingButtonLabelDeny, setLoadingButtonLabelDeny] = React.useState(
    "GO BACK"
  );
  const timer = React.useRef();

  const handleClose = () => {
    history.push(window.location.pathname.replace("/confirm-product", ""));
  };
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const handleConfirmButtonClick = () => {
    if (!loadingConfirm) {
      setSuccess(false);
      setLoadingConfirm(true);
    }

    fetch("/item-lists/add-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: history.location.state.productId,
        productName: history.location.state.productTitle,
        productURL: history.location.state.productURL,
        productImageURL: history.location.state.productImageURL,
        productCurrency: history.location.state.productCurrency,
        productPrice: history.location.state.productPrice,
        productSale: history.location.state.productSale,
        productSalePrice: history.location.state.productSalePrice,
        listName: history.location.state.listName,
      }),
    })
      .then(() => {
        timer.current = setTimeout(() => {
          history.push(
            window.location.pathname.replace("/confirm-product", "")
          );
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDenyButtonClick = () => {
    if (!loadingDeny) {
      setSuccess(false);
      setLoadingDeny(true);
    }
    timer.current = setTimeout(() => {
      history.push(
        window.location.pathname.replace("/confirm-product", "/add-new-product")
      );
    }, 1000);
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

  return (
    <Dialog
      scroll="paper"
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={true}
    >
      <div style={{ textAlign: "center", marginTop: 10 }} color="textSecondary">
        <Typography
          className={classes.cardTitle}
          color="textSecondary"
          gutterBottom
        >
          Are you sure you wish to add this product to your list:{" "}
        </Typography>
      </div>
      <div className={classes.pCDialogTitle} id="form-dialog-title">
        {history.location.state.listName}
      </div>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Card
          className={classes.cardManager}
          raised={true}
          value={history.location.state.productTitle}
        >
          <div className={classes.cardDivider}>
            <div className={classes.cardImageBox}>
              <div>
                <img
                  src={history.location.state.productImageURL}
                  className={classes.cardImg}
                />
              </div>
            </div>
            <div className={classes.cardTextBox}>
              <div>
                <Typography
                  className={classes.cardTitle}
                  color="textSecondary"
                  gutterBottom
                >
                  <Truncate width={100 * 6}>
                    {history.location.state.productTitle}
                  </Truncate>
                </Typography>
                <Typography className={classes.cardURL} gutterBottom>
                  <Truncate width={100 * 3}>
                    {history.location.state.productURL}
                  </Truncate>
                </Typography>
              </div>
              {history.location.state.productPrice == 0 && (
                <div style={{ marginTop: 10, fontSize: "12px", color: "red" }}>
                  Sorry, your product is currently unavailable.
                </div>
              )}
              {history.location.state.productPrice != 0 && ( // if product is unavailable
                <div style={{ marginTop: 10 }}>
                  {history.location.state.productSalePrice != null && (
                    <div className={classes.strikeThroughText}>
                      {history.location.state.productCurrency}
                      {addDecimalPlacesPrice(
                        history.location.state.productPrice
                      )}
                    </div>
                  )}
                  {history.location.state.productSalePrice != null && (
                    <div style={{ fontWeight: "bold" }}>
                      {history.location.state.productCurrency}
                      {addDecimalPlacesPrice(
                        history.location.state.productSalePrice
                      )}
                    </div>
                  )}
                  {history.location.state.productSalePrice == null && (
                    <div>
                      {history.location.state.productCurrency}
                      {addDecimalPlacesPrice(
                        history.location.state.productPrice
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
        <div>
          <Button
            classes={{ contained: classes.button }}
            variant="contained"
            size="large"
            className={buttonClassname}
            disabled={loadingConfirm || loadingDeny}
            onClick={handleConfirmButtonClick}
          >
            {loadingButtonLabelConfirm}
            {loadingConfirm && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
          <Button
            classes={{ contained: classes.button }}
            variant="contained"
            size="large"
            className={buttonClassname}
            disabled={loadingConfirm || loadingDeny}
            onClick={handleDenyButtonClick}
          >
            {loadingButtonLabelDeny}
            {loadingDeny && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductConfirmationDialog;
