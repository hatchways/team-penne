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
    // INSERT POST REQUEST TO UPDATE DATABASE HERE

    fetch("/itemLists/addItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: history.location.state.productId,
        productName: history.location.state.title,
        productURL: history.location.state.productURL,
        productImageURL: history.location.state.imageURL,
        productCurrency: history.location.state.currency,
        productPrice: history.location.state.price,
        productSale: history.location.state.sale,
        productSalePrice: history.location.state.salePrice,
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
    /*
    timer.current = setTimeout(() => {
      history.push(window.location.pathname.replace("/confirm-product", ""));
    }, 1000);*/
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
        Please confirm your product
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Card className={classes.singleCardManager} raised={true}>
          <div className={classes.cardImageBox}>
            <img
              src={history.location.state.imageURL}
              className={classes.cardImg}
            />
          </div>
          <div className={classes.cardTextBox}>
            <Typography
              className={classes.cardTitle}
              color="textSecondary"
              gutterBottom
            >
              <Truncate width={100 * 6}>
                {history.location.state.title}
              </Truncate>
            </Typography>
            <Typography className={classes.cardURL} gutterBottom>
              <Truncate width={100 * 3}>
                {history.location.state.productURL}
              </Truncate>
            </Typography>
            <h5>
              {history.location.state.currency}
              {history.location.state.price}
              {history.location.state.sale && history.location.state.currency}
              {history.location.state.sale && history.location.state.salePrice}
            </h5>
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
