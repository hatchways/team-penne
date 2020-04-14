import React from "react";
import { useHistory } from "react-router";
import {
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import dialogStyles from "./Styles/dialogStyles";

// Dummy data for lists
const lists = [];

function NewProductDialog() {
  const [productUrl, setProductUrl] = React.useState("");
  const [productUrlError, setProductUrlError] = React.useState(false);
  const [list, setList] = React.useState("");

  const classes = dialogStyles();
  const history = useHistory();

  const handleClose = () => {
    history.push(window.location.pathname.replace("/add-new-product", ""));
  };

  const handleList = (event) => {
    setList(event.target.value);
  };

  const handleProductUrl = (event) => {
    setProductUrl(event.target.value);
  };

  const checkProductUrl = (pUrl) => {
    return pUrl.length > 0;
  };

  // add anymore product validation
  const validateProduct = () => {
    let validProductUrl = checkProductUrl(productUrl);
    console.log("validProductUrl is: ", validProductUrl);
    if (validProductUrl) {
      setProductUrlError(false);
      localStorage.setItem("productUrl", productUrl);
      history.push(window.location.pathname.replace("/add-new-product", ""));
    } else setProductUrlError(true);
  };

  const enterSubmit = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 13) {
      validateProduct();
    }
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
        Add new item:
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Paste link to item
        </InputLabel>
        <Container classes={{ root: classes.container }}>
          <OutlinedInput
            classes={{
              root: classes.outlinedInputRoot,
              input: classes.outlinedInputInput,
            }}
            onKeyPress={enterSubmit}
            onChange={handleProductUrl}
            placeholder="Paste your link here"
            id="product-url-user-input"
            type="product-url"
            autoWidth={true}
            fullWidth
          />
        </Container>
        <Collapse in={productUrlError}>
          <Alert classes={{ root: classes.alert }} severity="error">
            Error: List title format is invalid.
          </Alert>
        </Collapse>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Select list:
        </InputLabel>
        <form className={classes.container}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="select-product-list-label"
              id="select-product-list"
              disableUnderline={true}
              native
              onChange={handleList}
              value={list}
              className={classes.selectDropdown}
            >
              <option value="" disabled selected hidden>
                Select
              </option>
              {lists.map((list) => (
                <option value={list.name}>{list.name}</option>
              ))}
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Button
          classes={{ contained: classes.button }}
          onClick={validateProduct}
          variant="contained"
          size="large"
        >
          ADD ITEM
        </Button>
      </DialogActions>
      <Divider classes={{ root: classes.divider }} />
    </Dialog>
  );
}

export default NewProductDialog;
