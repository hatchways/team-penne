import React from "react";
import {
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,  
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import dialogStyles from "./Styles/dialogStyles";


// Dummy data for lists
const lists = [
  {
    name: "Shoes",
    amount: 2,
    image: "https://m.media-amazon.com/images/I/81eA2SDaGcL._AC_255_.jpg",
  },
  {
    name: "Video Games",
    amount: 51,
    image:
      "https://cnet4.cbsistatic.com/img/0EX8LMQJ2T0L65MB_V6vyI2D1RA=/1200x675/2019/11/04/2f494437-c7dd-4a4c-ac0b-aab7a93d996e/p1005326-2.jpg",
  },
  {
    name: "Food",
    amount: 61,
    image:
      "https://4.bp.blogspot.com/-1PPIpuTPnPY/UCudijf1DPI/AAAAAAAABgY/Ohzq0co9uyk/s1600/generic.jpg",
  },
  {
    name: "Clothes",
    amount: 32,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  },
  {
    name: "Toiletries",
    amount: 43,
    image:
      "https://www.travelfashiongirl.com/wp-content/uploads/2017/09/ultimate-guide-to-travel-toiletries-010.jpg",
  },
];


function NewProductDialog() {
  const [productUrl, setProductUrl] = React.useState("");
  const [productUrlError, setProductUrlError] = React.useState(false);
  const [list, setList] = React.useState("");

  const classes = dialogStyles();

  const handleClose = () => {
    window.location.href = window.location.href.replace("/add-new-product", "");
  };

  const handleList = (event) => {
    setList(event.target.value)
  }

  const handleProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  
  const checkProductUrl = (lName) => {
    return lName.length > 0;
  }

  // add anymore product validation
  const validateProduct = () => {
    let validProductUrl = checkProductUrl(productUrl)
    console.log("validProductUrl is: ", validProductUrl);
    if(validProductUrl){
      setProductUrlError(false);
      localStorage.setItem("productUrl", productUrl);
      window.location.href = "/dashboard";
    }
    else setProductUrlError(true);
  };

  const enterSubmit = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode == 13) {
      validateProduct();
    }
  };

  return (
    <Dialog
      scroll="body"
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
          <Alert 
            classes={{ root: classes.alert }} 
            severity="error">
            Error: List title format is invalid.
          </Alert>
        </Collapse>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Select list:
        </InputLabel>
        <Container id="select-product-list" classes={{ root: classes.container }}>
          <InputLabel htmlFor="select-product-list">
            <Typography color="secondary">Select</Typography>          
          </InputLabel>
          <Select
            native
            labelId="select-product-list"
            id="select-product-list"
            style={{ color: "rgb(192,192,192)" }}
            disableUnderline={true}
            color="secondary"
            value={list}
            onChange={handleList}
            autoWidth={true}
          >
            {lists.map((list) => (
                    <MenuItem value={list.name}>{list.name}</MenuItem>
                  ))}
          </Select>
        </Container>
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