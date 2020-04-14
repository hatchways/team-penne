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
    name: "Amazon Brand - Lark & Ro Women's Classic Long Sleeve Wrap Dress",
    price: "CDN$ 50.00 - CDN$ 51.00",
    priceChange: ["no", ""],
    image: "https://m.media-amazon.com/images/I/71llT0hX4yL._AC_UL320_ML3_.jpg",
    url: "https://www.amazon.ca/Lark-Ro-Womens-Classic-Sleeve/dp/B079LZYK9Z/ref=sr_1_5?dchild=1&pf_rd_i=10287502011&pf_rd_m=A1IM4EOPHS76S7&pf_rd_p=ae1d22f6-58be-43c1-b02d-b4f02d0f1984&pf_rd_r=T3HNW3RCYD4NN1080RZ4&pf_rd_s=merchandised-search-2&pf_rd_t=101&qid=1586447094&refinements=p_n_feature_twenty-one_browse-bin%3A17324655011%7C17324656011&s=apparel&sr=1-5",
  },
  {
    name: "DuraDrive Two Tone Tradesman Jacket with Black Contrast",
    price: "CDN$ 72.99",
    priceChange: ["no", ""],
    image: "https://i.ebayimg.com/thumbs/images/g/~GQAAOSwFw1dt0WK/s-l225.webp",
    url: "https://www.ebay.ca/itm/DuraDrive-Two-Tone-Tradesman-Jacket-with-Black-Contrast/283657052584?var=585002452799",
  },
  {
    name: "Hanes Mens EcoSmart Fleece Sweatshirt Sweatshirt",
    price: "CDN$ 12.99 - CDN$ 56.02",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/417jarmXPJL._AC_SX184_.jpg",
    url: "https://www.amazon.ca/dp/B01L8JJ57U/ref=s9_acsd_otopr_hd_bw_bBECI0R_c2_x_0_i?pf_rd_m=A1IM4EOPHS76S7&pf_rd_s=merchandised-search-11&pf_rd_r=ES5DH1EN2FX5SJ0THJS5&pf_rd_t=101&pf_rd_p=3ada58ad-f30c-5b38-924b-e328dc7c98fa&pf_rd_i=10287259011",
  },
  {
    name: "Hanes ComfortBlend EcoSmart Pullover Hoodie Sweatshirt",
    price: "CDN$ 17.60 - CDN$ 63.50",
    priceChange: ["no", ""],
    image: "https://images-na.ssl-images-amazon.com/images/I/4173H5Ga0bL._AC_SX184_.jpg",
    url: "https://www.amazon.ca/dp/B072MR4NTH/ref=s9_acsd_otopr_hd_bw_bBECI0R_c2_x_2_i?pf_rd_m=A1IM4EOPHS76S7&pf_rd_s=merchandised-search-11&pf_rd_r=ES5DH1EN2FX5SJ0THJS5&pf_rd_t=101&pf_rd_p=3ada58ad-f30c-5b38-924b-e328dc7c98fa&pf_rd_i=10287259011",
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
    setListName(history.location.state.name);
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