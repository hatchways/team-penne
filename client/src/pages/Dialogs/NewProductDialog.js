import React from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import {
  Button,
  CircularProgress,
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
  const classes = dialogStyles();
  const history = useHistory();

  const [productUrl, setProductUrl] = React.useState("");
  const [productUrlError, setProductUrlError] = React.useState(false);
  const [list, setList] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loadingButtonLabel, setLoadingButtonLabel] = React.useState("ADD ITEM");
  const [loadErr, setLoadErr] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [listError, setListError] = React.useState(false);
  const timer = React.useRef();

  const handleClose = () => {
    history.push(window.location.pathname.replace("/add-new-product", ""));
  };
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const handleButtonClick = () => {
    getProductFromUrl();
  };

  const handleList = (event) => {
    setList(event.target.value)
  }
  const handleProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
    
  // PRODUCT/LIST VERIFICATION
  const listVerification = () => {
    if (list != ""){
      setListError(false);
      return true
    }
    setListError(true);
    setErrorMessage("Error: A list needs to be selected.");
    return false
  }
  const productUrlVerification = () => {
    if (productUrl.length > 0){
      setProductUrlError(false);
      return true
    }
    setProductUrlError(true);
    return false
  }
  const verificationCheck = () => {
    const prodValid = productUrlVerification();
    const listValid = listVerification();
    if(prodValid && listValid){
      return true
    }
    return false
  }

  const getProductFromUrl = () => {
    if(verificationCheck()){
      setSuccess(false);
      setLoading(true);
      localStorage.setItem("productUrl", productUrl);
      fetch("/api/scrape/?url="+productUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        setLoadingButtonLabel("Product Retrieved");
        console.log("Product Added!\nId: " + res.productId +
          "\nTitle: " +  res.title +
          "\nProduct Price: " + res.price +
          "\nProduct URL: " + res.imageURL + 
          "\nProduct on sale: " + res.sale
        );
        timer.current = setTimeout(() => {
            history.push(window.location.pathname.replace("/add-new-product", "/confirm-product"), 
              {title: res.title, 
                price: res.price, 
                imageURL: res.imageURL, 
                sale: res.sale,
                productURL: productUrl});
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSuccess(false);
        setLoadErr(true);
        setErrorMessage("Error: There was an error loading your product. Please check the link and try again.");
        setLoadingButtonLabel("ADD ITEM");
      });
    }
    else {
      console.log("Invalid username/password.");
      setLoading(false);
      setSuccess(false);
    }
  };

  const enterSubmit = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode == 13) {
      getProductFromUrl();
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
            //onKeyPress={enterSubmit}
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
                <option value={list.name}>{list.name}</option >
              ))}
            </Select>
          </FormControl>
          <Collapse in={loadErr || listError}>
            <Alert 
              classes={{ root: classes.alert }} 
              severity="error">
              {errorMessage}
            </Alert>
          </Collapse>
        </form>
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <div>
          <Button
            classes={{ contained: classes.button }}
            variant="contained"
            size="large"
            className={buttonClassname}
            disabled={loading}
            onClick={handleButtonClick}
          >
            {loadingButtonLabel}
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Button>
        </div>
      </DialogActions>
      <Divider classes={{ root: classes.divider }} />
    </Dialog>
  );
}

export default NewProductDialog;