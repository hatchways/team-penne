import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Truncate from "react-truncate";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Toolbar,
  Typography
} from "@material-ui/core";
import io from "socket.io-client";

import navbarStyles from "./styles/navbarStyles";
import notifStyles from "./styles/notificationStyles";
import StyledMenu from "./styles/styledMenu";
import logo from "../../assets/logo.png";
import noUserProfilePic from "../../assets/noUserProfilePic.png";

let socket;
let interval;
const emptyList = [];

function Navbar(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuBool, setProfileMenu] = useState(false);
  const [notificationMenuBool, setNotificationMenu] = useState(false);
  const [shoppingListsMenuBool, setShoppingListsMenu] = useState(
    props.currentTab == "shoppingLists"
  );
  const [followersMenuBool, setFollowersMenu] = useState(
    props.currentTab == "followers"
  );
  const [notificationsList, setNotificationsList] = useState(emptyList);
  const [deleteItem, setDeleteItem] = useState(-1);
  const [onDeleteIndex, setOnDeleteIndex] = useState(-1);

  const navbarClasses = navbarStyles();
  const classes = notifStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const history = useHistory();

  const [createSocket, setCreateSocket] = React.useState(true);

  // useEffect for creating and using the socket
  useEffect(() => {
    if (createSocket) {
      socket = io("localhost:3000");
      setCreateSocket(false);
    }

    socket.on("getNotifications", message => {
      // message contains an object which has had it's price changed
      var messageFound = false;

      for (let i = 0; i < notificationsList.length; i++) {
        if (notificationsList[i].id == message.id) {
          messageFound = true;
          notificationsList[i] = message;
          setNotificationsList(notificationsList);
          break;
        }
      }
      if (!messageFound) setNotificationsList([...notificationsList, message]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
      clearInterval(interval);
    };
  });

  const handleLogout = () => {
    socket.emit("disconnect");
    socket.off();
    clearInterval(interval);
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

  const handleShoppingListsClick = event => {
    setShoppingListsMenu(true);
    setFollowersMenu(false);
    setNotificationMenu(false);
    setProfileMenu(false);

    history.push("/dashboard/shoppingLists");
  };
  const handleFollowersClick = event => {
    setShoppingListsMenu(false);
    setFollowersMenu(true);
    setNotificationMenu(false);
    setProfileMenu(false);

    history.push("/dashboard/followers");
  };

  const handleEditProfileClick = event => {
    setShoppingListsMenu(false);
    setFollowersMenu(false);
    setNotificationMenu(false);
    setProfileMenu(false);

    history.push("/dashboard/edit-profile");
  };

  const handleNotificationClick = event => {
    setNotificationMenu(true);
    setProfileMenu(false);
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = event => {
    setNotificationMenu(false);
    setProfileMenu(true);
    setAnchorEl(event.currentTarget);
  };

  const handleDismiss = index => {
    setOnDeleteIndex(index);
    fetch("/update-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: notificationsList[index].id,
        dismissed: notificationsList[index].dismissed
      })
    });
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

  // on Delete from notification
  useEffect(() => {
    if (onDeleteIndex != -1) {
      notificationsList.splice(onDeleteIndex, 1);
      setDeleteItem(onDeleteIndex);
      setOnDeleteIndex(-1);
    }
  });

  // get the userprofile
  useEffect(() => {
    if (props.getProfileInfo() == "") {
      fetch("/userprofile")
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(res => {
          if (res.userImageURL == null) {
            props.setUserProfile({
              userName: res.userName,
              userEmail: res.userEmail,
              profilePicImage: noUserProfilePic
            });
          } else {
            props.setUserProfile({
              userName: res.userName,
              userEmail: res.userEmail,
              profilePicImage: res.userImageURL
            });
          }
        });
    }
  });

  // get everything to do on the first load
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      fetch("/get-notifications")
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(res => {
          setNotificationsList(res.notifications);
        });
    }
  });

  return (
    <AppBar position="sticky">
      <Toolbar className={navbarClasses.nav}>
        <div className={navbarClasses.alignLeft}>
          <img src={logo} alt="" />
        </div>
        <div className={navbarClasses.alignRight}>
          <div onClick={handleShoppingListsClick}>
            {!shoppingListsMenuBool && (
              <p style={{ fontWeight: "normal", color: "black" }}>
                Shopping Lists
              </p>
            )}
            {shoppingListsMenuBool && (
              <p style={{ fontWeight: "bold", color: "red" }}>Shopping Lists</p>
            )}
          </div>
          <div onClick={handleFollowersClick}>
            {!followersMenuBool && (
              <p style={{ fontWeight: "normal", color: "black" }}>Followers</p>
            )}
            {followersMenuBool && (
              <p style={{ fontWeight: "bold", color: "red" }}>Followers</p>
            )}
          </div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleNotificationClick}
            style={{ textTransform: "none" }}
          >
            {!notificationMenuBool && (
              <div style={{ fontWeight: "normal", color: "black" }}>
                Notifications
              </div>
            )}
            {notificationMenuBool && (
              <div style={{ fontWeight: "bold", color: "red" }}>
                Notifications
              </div>
            )}
            {notificationsList.length != 0 && <div>{bull}</div>}
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
            {notificationsList.length == 0 && (
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
            {notificationsList.length != 0 &&
              notificationsList.map(listItem => (
                <Card
                  className={classes.cardManager}
                  elevation={3}
                  value={listItem.name}
                  variant="outlined"
                  disabled={notificationsList.indexOf(listItem) === deleteItem}
                >
                  <div className={classes.cardImageBox}>
                    <img
                      src={listItem.image}
                      className={classes.cardImg}
                      alt="product-image"
                    />
                  </div>
                  <div className={classes.cardTextBox}>
                    <div>
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
                    </div>
                    <div className={classes.cardDivider}>
                      <div className={classes.alignVertically}>
                        {listItem.salePrice != null && (
                          <div className={classes.strikeThroughText}>
                            {listItem.currency}
                            {addDecimalPlacesPrice(listItem.price)}
                          </div>
                        )}
                        {listItem.salePrice != null && (
                          <div style={{ fontWeight: "bold" }}>
                            {listItem.currency}
                            {addDecimalPlacesPrice(listItem.salePrice)}
                          </div>
                        )}
                        {listItem.salePrice == null &&
                          listItem.price == "0" && (
                            <div style={{ color: "red" }}>
                              Product Unavailable.
                            </div>
                          )}
                        {listItem.salePrice == null && listItem.price != "0" && (
                          <div>
                            {listItem.currency}
                            {addDecimalPlacesPrice(listItem.price)}
                          </div>
                        )}
                      </div>
                      <div className={classes.alignVertically}>
                        <Button
                          size="small"
                          onClick={() => window.open(listItem.url, "_blank")}
                        >
                          Go to product
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            handleDismiss(notificationsList.indexOf(listItem));
                          }}
                        >
                          Dismiss
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

          <Button
            onClick={handleLogout}
            className={classes.removeTextTransform}
          >
            Logout
          </Button>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            onClick={handleProfileClick}
            className={classes.removeTextTransform}
          >
            <div className={navbarClasses.circular}>
              <img
                src={props.getProfileInfo().profilePicImage}
                alt="profile-pic"
              />
            </div>
            {!profileMenuBool && (
              <div style={{ fontWeight: "normal", color: "black" }}>
                Profile
              </div>
            )}
            {profileMenuBool && (
              <div style={{ fontWeight: "bold", color: "red" }}>Profile</div>
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
                <img
                  src={props.getProfileInfo().profilePicImage}
                  alt="profile-pic"
                />
              </div>
              <Typography variant="h5" component="h2">
                {props.getProfileInfo().userName}
              </Typography>
              <Typography className={classes.pos} color="texteSecondary">
                {props.getProfileInfo().userEmail}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleEditProfileClick} size="small">
                Edit Profile
              </Button>
            </CardActions>
          </StyledMenu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
