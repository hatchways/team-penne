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
  Typography
} from "@material-ui/core";
import Truncate from "react-truncate";
import dialogStyles from "./Styles/dialogStyles";

function RemoveListConfirmation() {
  const classes = dialogStyles();
  const history = useHistory();

  // state declaration
  const [loadingDeny, setLoadingDeny] = React.useState(false);
  const [loadingConfirm, setLoadingConfirm] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [
    loadingButtonLabelConfirm,
    setLoadingButtonLabelConfirm
  ] = React.useState("CONFIRM");
  const [loadingButtonLabelDeny, setLoadingButtonLabelDeny] = React.useState(
    "GO BACK"
  );
  const timer = React.useRef();

  const handleClose = () => {
    history.push(window.location.pathname.replace("/confirm-remove-list", ""));
  };
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });
  const handleConfirmButtonClick = () => {
    if (!loadingConfirm) {
      setSuccess(false);
      setLoadingConfirm(true);
    }

    fetch("/item-lists/remove-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        listName: history.location.state.listName
      })
    })
      .then(() => {
        timer.current = setTimeout(() => {
          history.push(
            window.location.pathname.replace("/confirm-remove-list", "")
          );
        }, 1000);
      })
      .catch(err => {
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
        window.location.pathname.replace("/confirm-remove-list", "")
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
      <div style={{ textAlign: "center", marginTop: 10 }} color="textSecondary">
        <Typography
          className={classes.cardTitle}
          color="textSecondary"
          gutterBottom
        >
          Are you sure you wish to remove this list:{" "}
        </Typography>
      </div>
      <div className={classes.pCDialogTitle} id="form-dialog-title">
        {history.location.state.listName}
      </div>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <img
          style={{ maxWidth: "50%", maxHeight: "200px" }}
          src={history.location.state.listImage}
        />
        {history.location.state.numberOfItems == 1 && (
          <div>
            <Typography
              style={{ color: "red" }}
              className={classes.cardTitle}
              color="textSecondary"
              gutterBottom
            >
              WARNING! This will also remove the{" "}
              {history.location.state.numberOfItems} item in the list!
            </Typography>
          </div>
        )}
        {history.location.state.numberOfItems != 1 && (
          <div>
            <Typography
              style={{ color: "red" }}
              className={classes.cardTitle}
              color="textSecondary"
              gutterBottom
            >
              WARNING! This will also remove all{" "}
              {history.location.state.numberOfItems} items in the list!
            </Typography>
          </div>
        )}
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

export default RemoveListConfirmation;
