import React, { useEffect } from "react";
import Truncate from 'react-truncate';
import { useHistory } from 'react-router';
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

// Dummy data for items in shoes
const clothes = [
  {
    name: "FLY HAWK Mens Dress Shirts, Bamboo Button Down Casual Slim Long Sleeve Work Shirt for Men",
    price: "CDN$ 31.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/41Q4rw8qRsL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/FLY-HAWK-Button-Bamboo-Casual/dp/B07CT36T9F/ref=lp_10287298011_1_1_sspa?s=apparel&ie=UTF8&qid=1586275913&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFZQlFFMzFSQjFRUUUmZW5jcnlwdGVkSWQ9QTA5MzM1MzU2Ukk4R0pPUEEwMTgmZW5jcnlwdGVkQWRJZD1BMDA2MzM4OTFTNThZRThDVDRVWDUmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
  },
  {
    name: "COOFANDY Men's Casual Long Sleeve Dress Shirt Denim Button Down Shirts",
    price: "CDN$ 23.99 - CDN$ 36.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/51+ws33sqEL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/Coofandy-Casual-Sleeve-Button-Shirts/dp/B01FM46HI2/ref=lp_10287298011_1_22?s=apparel&ie=UTF8&qid=1586275913&sr=1-22",
  },
  {
    name: "FLY HAWK Mens Dress Shirts, Bamboo Button",
    price: "CDN$ 31.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/41Q4rw8qRsL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/FLY-HAWK-Button-Bamboo-Casual/dp/B07CT36T9F/ref=lp_10287298011_1_1_sspa?s=apparel&ie=UTF8&qid=1586275913&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFZQlFFMzFSQjFRUUUmZW5jcnlwdGVkSWQ9QTA5MzM1MzU2Ukk4R0pPUEEwMTgmZW5jcnlwdGVkQWRJZD1BMDA2MzM4OTFTNThZRThDVDRVWDUmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
  },
  {
    name: "FLY HAWK Mens Dress Shirts, Bamboo Button Down Casual Slim Long Sleeve Work Shirt for Men",
    price: "CDN$ 31.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/41Q4rw8qRsL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/FLY-HAWK-Button-Bamboo-Casual/dp/B07CT36T9F/ref=lp_10287298011_1_1_sspa?s=apparel&ie=UTF8&qid=1586275913&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFZQlFFMzFSQjFRUUUmZW5jcnlwdGVkSWQ9QTA5MzM1MzU2Ukk4R0pPUEEwMTgmZW5jcnlwdGVkQWRJZD1BMDA2MzM4OTFTNThZRThDVDRVWDUmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
  },
  {
    name: "COOFANDY Men's Casual Long Sleeve Dress Shirt Denim Button Down Shirts",
    price: "CDN$ 23.99 - CDN$ 36.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/51+ws33sqEL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/Coofandy-Casual-Sleeve-Button-Shirts/dp/B01FM46HI2/ref=lp_10287298011_1_22?s=apparel&ie=UTF8&qid=1586275913&sr=1-22",
  },
  {
    name: "FLY HAWK Mens Dress Shirts, Bamboo Button Down Casual Slim Long Sleeve Work Shirt for Men",
    price: "CDN$ 31.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/41Q4rw8qRsL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/FLY-HAWK-Button-Bamboo-Casual/dp/B07CT36T9F/ref=lp_10287298011_1_1_sspa?s=apparel&ie=UTF8&qid=1586275913&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFZQlFFMzFSQjFRUUUmZW5jcnlwdGVkSWQ9QTA5MzM1MzU2Ukk4R0pPUEEwMTgmZW5jcnlwdGVkQWRJZD1BMDA2MzM4OTFTNThZRThDVDRVWDUmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
  },
  {
    name: "COOFANDY Men's Casual Long Sleeve Dress Shirt Denim Button Down Shirts",
    price: "CDN$ 23.99 - CDN$ 36.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/51+ws33sqEL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/Coofandy-Casual-Sleeve-Button-Shirts/dp/B01FM46HI2/ref=lp_10287298011_1_22?s=apparel&ie=UTF8&qid=1586275913&sr=1-22",
  },
  {
    name: "FLY HAWK Mens Dress Shirts, Bamboo Button Down Casual Slim Long Sleeve Work Shirt for Men FLY HAWK Mens Dress Shirts, Bamboo Button Down Casual Slim Long Sleeve Work Shirt for Men",
    price: "CDN$ 31.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/41Q4rw8qRsL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/FLY-HAWK-Button-Bamboo-Casual/dp/B07CT36T9F/ref=lp_10287298011_1_1_sspa?s=apparel&ie=UTF8&qid=1586275913&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFZQlFFMzFSQjFRUUUmZW5jcnlwdGVkSWQ9QTA5MzM1MzU2Ukk4R0pPUEEwMTgmZW5jcnlwdGVkQWRJZD1BMDA2MzM4OTFTNThZRThDVDRVWDUmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
  },
  {
    name: "COOFANDY Men's Casual Long Sleeve Dress Shirt Denim Button Down Shirts COOFANDY Men's Casual Long Sleeve Dress Shirt Denim Button Down Shirts",
    price: "CDN$ 23.99 - CDN$ 36.99",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/51+ws33sqEL._SL260_SX200_CR0,0,200,260_.jpg",
    url: "https://www.amazon.ca/Coofandy-Casual-Sleeve-Button-Shirts/dp/B01FM46HI2/ref=lp_10287298011_1_22?s=apparel&ie=UTF8&qid=1586275913&sr=1-22",
  },
]

// Dummy data for lists
const allLists = [
  {
    name: "Shoes",
    amount: 2,
    image: "https://m.media-amazon.com/images/I/81eA2SDaGcL._AC_255_.jpg",
    itemList: [],
  },
  {
    name: "Video Games",
    amount: 51,
    image:
      "https://cnet4.cbsistatic.com/img/0EX8LMQJ2T0L65MB_V6vyI2D1RA=/1200x675/2019/11/04/2f494437-c7dd-4a4c-ac0b-aab7a93d996e/p1005326-2.jpg",
    itemList: [],
  },
  {
    name: "Food",
    amount: 61,
    image:
      "https://4.bp.blogspot.com/-1PPIpuTPnPY/UCudijf1DPI/AAAAAAAABgY/Ohzq0co9uyk/s1600/generic.jpg",
      itemList: [],
  },
  {
    name: "Clothes",
    amount: 32,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    itemList: clothes,
  },
  {
    name: "Toiletries",
    amount: 43,
    image:
      "https://www.travelfashiongirl.com/wp-content/uploads/2017/09/ultimate-guide-to-travel-toiletries-010.jpg",
    itemList: [],
  },
];

function EditListDialog() {
  const [productUrl, setProductUrl] = React.useState("");
  const [listName, setListName] = React.useState("");

  const classes = dialogStyles();
  const history = useHistory();

  const handleClose = () => {
    history.push(window.location.pathname.replace("/edit-list", ""));
  };

  const handleProductUrl = (event) => {
    setProductUrl(event.target.value);
  };
  
  const checkProductUrl = (pUrl) => {
    return pUrl.length > 0;
  }

  // add anymore product validation
  const redirectToNewProduct = () => {
    history.push(window.location.pathname.replace("/edit-list", "/add-new-product"));
  };

  const redirectToNewUrl = (url) => {
    window.location.href = url;
  }

  const enterSubmit = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode == 13) {
        redirectToNewProduct();
    }
  };

  useEffect(() => {
    console.log(history.location.state)
    console.log("Old ListName ", listName)
    setListName(history.location.state.name);
    console.log("Updated ListName ", listName)
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
        id="form-dialog-title">
        {listName}
        <Typography variant="body2" component="h1" color="textSecondary">6 items</Typography>
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
          {clothes.map((listItem) => (
            <Card className={classes.cardManager} raised={true} value={listItem.name}>
              <CardActions>
                  <div className={classes.cardDivider}>
                    <div className={classes.cardImageBox}>
                      <img
                        src={listItem.image}
                        className={classes.cardImg}
                      />
                    </div>
                    <div className={classes.cardTextBox}>
                      <Typography 
                        className={classes.cardTitle}
                        color="textSecondary" 
                        gutterBottom>
                          <Truncate width={100*6}>
                            {listItem.name}
                          </Truncate>
                      </Typography>
                        <Typography
                          className={classes.cardURL}
                          gutterBottom
                         >
                          <Truncate width={100*3}>
                            {listItem.url}
                          </Truncate>
                        </Typography>
                      <h5>{listItem.price}</h5>
                    </div>
                  </div>
                <Button
                  classes={{outlined: classes.removeButton}}
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