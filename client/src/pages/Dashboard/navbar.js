import React from "react";
import Truncate from "react-truncate";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Menu,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";

import navbarStyles from "./styles/navbarStyles";
import notifStyles from "./styles/notificationStyles";
import logo from "../../assets/logo.png";

const userProfile = {
  userName: "Patrick Star",
  userEmail: "thisispatrick@example.com",
  profilePicImage:
    "https://i2-prod.mirror.co.uk/incoming/article10883656.ece/ALTERNATES/s615b/PROD-Lost-In-Space-Anniversary-party.jpg"
};
const itemList1 = [];
const itemList = [
  {
    name:
      "FLY HAWK Mens Dress Shirts, Bamboo Button Down Casual Slim Long Sleeve Work Shirt for Men",
    currency: "CDN$",
    price: 31.99,
    salePrice: 23.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41Q4rw8qRsL._SL260_SX200_CR0,0,200,260_.jpg",
    url:
      "https://www.amazon.ca/FLY-HAWK-Button-Bamboo-Casual/dp/B07CT36T9F/ref=lp_10287298011_1_1_sspa?s=apparel&ie=UTF8&qid=1586275913&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFZQlFFMzFSQjFRUUUmZW5jcnlwdGVkSWQ9QTA5MzM1MzU2Ukk4R0pPUEEwMTgmZW5jcnlwdGVkQWRJZD1BMDA2MzM4OTFTNThZRThDVDRVWDUmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ=="
  },
  {
    name:
      "COOFANDY Men's Casual Long Sleeve Dress Shirt Denim Button Down Shirts",
    currency: "CDN$",
    price: 36.99,
    salePrice: 33.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51+ws33sqEL._SL260_SX200_CR0,0,200,260_.jpg",
    url:
      "https://www.amazon.ca/Coofandy-Casual-Sleeve-Button-Shirts/dp/B01FM46HI2/ref=lp_10287298011_1_22?s=apparel&ie=UTF8&qid=1586275913&sr=1-22"
  },
  {
    name: "FLY HAWK Mens Dress Shirts, Bamboo Button",
    currency: "CDN$",
    price: 31.99,
    salePrice: 23.99,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41Q4rw8qRsL._SL260_SX200_CR0,0,200,260_.jpg",
    url:
      "https://www.amazon.ca/FLY-HAWK-Button-Bamboo-Casual/dp/B07CT36T9F/ref=lp_10287298011_1_1_sspa?s=apparel&ie=UTF8&qid=1586275913&sr=1-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFZQlFFMzFSQjFRUUUmZW5jcnlwdGVkSWQ9QTA5MzM1MzU2Ukk4R0pPUEEwMTgmZW5jcnlwdGVkQWRJZD1BMDA2MzM4OTFTNThZRThDVDRVWDUmd2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3NlJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ=="
  }
];

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuBool, setProfileMenu] = React.useState(false);
  const [notificationMenuBool, setNotificationMenu] = React.useState(false);
  const navbarClasses = navbarStyles();
  const classes = notifStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleLogout = () => {
    fetch("/logout").then(res => {
      if (res.status === 200) {
        localStorage.clear();
        props.history.push("/");
        props.handleLogout();
      }
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationMenu(false);
    setProfileMenu(false);
  };

  const handleClick = event => {
    setNotificationMenu(true);
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = event => {
    setProfileMenu(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={navbarClasses.nav}>
        <div className={navbarClasses.alignLeft}>
          <img src={logo} alt="" />
        </div>
        <div className={navbarClasses.alignRight}>
          <p>Shopping Lists</p>
          <p>Friends</p>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ textTransform: "none" }}
          >
            {!notificationMenuBool && (
              <div style={{ fontWeight: "normal" }}>Notifications</div>
            )}
            {notificationMenuBool && (
              <div style={{ fontWeight: "bold" }}>Notifications</div>
            )}
            {itemList.length != 0 && <div>{bull}</div>}
          </Button>
          <StyledMenu
            scroll="paper"
            id="customized-menu"
            style={{ maxHeight: 500 }}
            anchorEl={anchorEl}
            keepMounted
            open={notificationMenuBool}
            onClose={handleClose}
          >
            <div className={classes.styledMenuItem}>
              <Typography className={classes.recentDiscountsTitle} gutterBottom>
                New Prices!
              </Typography>
            </div>
            {itemList.length == 0 && (
              <Card
                className={classes.emptyCardManager}
                elevation={3}
                variant="outlined"
              >
                <CardContent className={classes.emptyCardAligner}>
                  <div>You have no new notifications.</div>
                </CardContent>
              </Card>
            )}
            {itemList.length != 0 &&
              itemList.map(listItem => (
                <Card
                  className={classes.cardManager}
                  elevation={3}
                  value={listItem.name}
                  variant="outlined"
                >
                  <div className={classes.cardImageBox}>
                    <img src={listItem.image} className={classes.cardImg} />
                  </div>
                  <div className={classes.cardTextBox}>
                    <Typography
                      className={classes.cardTitle}
                      color="textSecondary"
                      gutterBottom
                    >
                      <Truncate width={100 * 6}>{listItem.name}</Truncate>
                    </Typography>
                    <Typography className={classes.cardURL} gutterBottom>
                      <Truncate width={100 * 3}>{listItem.url}</Truncate>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 18
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {listItem.salePrice != null && (
                          <div
                            style={{
                              color: "red",
                              textDecorationLine: "line-through",
                              fontSize: "10px"
                            }}
                          >
                            {listItem.currency}
                            {listItem.price}
                          </div>
                        )}
                        {listItem.salePrice != null && (
                          <div style={{ fontWeight: "bold" }}>
                            {listItem.currency}
                            {listItem.salePrice}
                          </div>
                        )}
                        {listItem.salePrice == null && (
                          <div>
                            {listItem.currency}
                            {listItem.price}
                          </div>
                        )}
                      </div>
                      <div style={{ alignSelf: "flex-end" }}>
                        <Button
                          onClick={() => window.open(listItem.url, "_blank")}
                        >
                          Go to product
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            <div className={classes.seeAllButton}>
              <Button size="small">See all</Button>
            </div>
          </StyledMenu>

          <Button onClick={handleLogout} style={{ textTransform: "none" }}>
            Logout
          </Button>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleProfileClick}
            style={{ textTransform: "none" }}
          >
            <div className={navbarClasses.circular}>
              <img src={userProfile.profilePicImage} alt="profile-pic" />
            </div>
            {!profileMenuBool && (
              <div style={{ fontWeight: "normal" }}>Profile</div>
            )}
            {profileMenuBool && (
              <div style={{ fontWeight: "bold" }}>Profile</div>
            )}
          </Button>
          <StyledMenu
            scroll="paper"
            id="customized-menu"
            style={{ height: "100%", width: "100%" }}
            anchorEl={anchorEl}
            keepMounted
            open={profileMenuBool}
            onClose={handleClose}
          >
            <CardContent>
              <div className={navbarClasses.circularBigger}>
                <img src={userProfile.profilePicImage} alt="profile-pic" />
              </div>
              <Typography variant="h5" component="h2">
                {userProfile.userName}
              </Typography>
              <Typography className={classes.pos} color="texteSecondary">
                {userProfile.userEmail}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Edit Profile</Button>
            </CardActions>
          </StyledMenu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
