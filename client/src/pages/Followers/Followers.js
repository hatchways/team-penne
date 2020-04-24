import React from "react";
import { Container } from "@material-ui/core";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "./TabPanel";
import UserCard from "./UserCard";
import ProfilePage from "../Profile/ProfilePage";
import followerStyles from "./styles/FollowerStyles";
import noUserProfilePic from "../../assets/noUserProfilePic.png";
import { Route } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Followers(props) {
  const classes = followerStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [userListFollowers, setUserListFollowers] = React.useState([]);
  const [userListFollowing, setUserListFollowing] = React.useState([]);
  const [suggestedUsersList, setSuggestedUsersList] = React.useState([]);
  const [loadedUsers, setLoadedUsers] = React.useState(false);

  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const getAllUsers = () => {
    fetch("/get-all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        setSuggestedUsersList(res.usersList);
        localStorage.setItem("usersList", JSON.stringify(res.usersList));
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const handleProfileRouting = (user) => {
    props.history.push(`/dashboard/profile/${user.userId}`, {
      userName: user.userName,
      userEmail: user.userEmail,
      userImageURL: user.userImageURL,
    });
  };

  React.useEffect(() => {
    if (!loadedUsers) {
      getAllUsers();
      setLoadedUsers(true);
    }
  }, [loadedUsers]);

  return (
    <Container className={classes.followersContainer}>
      <div>
        <Typography variant="h5">Followers</Typography>
      </div>
      <Container className={classes.tabBox}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Following" {...a11yProps(1)} />
          <Tab label="Suggested" {...a11yProps(2)} />
        </Tabs>
      </Container>
      <Box boxShadow={3} className={classes.cardBox}>
        <TabPanel value={tabValue} index={0}>
          {userListFollowers.map((listItem, index) => (
            <UserCard
              userName={listItem.userName}
              profilePicImage={
                listItem.userImageURL == null
                  ? noUserProfilePic
                  : listItem.userImageURL
              }
              cardType={"Followers"}
              handleProfileRouting={() => {
                handleProfileRouting(listItem);
              }}
              following={listItem.following}
              handleFollowerButtonClick={() => {
                userListFollowers[index].following = !listItem.following;
              }}
            />
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {userListFollowing.map((listItem, index) => (
            <UserCard
              userName={listItem.userName}
              profilePicImage={
                listItem.userImageURL == null
                  ? noUserProfilePic
                  : listItem.userImageURL
              }
              cardType={"Following"}
              handleProfileRouting={() => {
                handleProfileRouting(listItem);
              }}
              following={listItem.following}
              handleFollowerButtonClick={() => {
                userListFollowing[index].following = !listItem.following;
              }}
            />
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {suggestedUsersList.map((listItem, index) => (
            <UserCard
              userName={listItem.userName}
              profilePicImage={
                listItem.userImageURL == null
                  ? noUserProfilePic
                  : listItem.userImageURL
              }
              cardType={"Suggested"}
              handleProfileRouting={() => {
                handleProfileRouting(listItem);
              }}
              following={false}
              handleFollowerButtonClick={() => {
                console.log(
                  `In handle follower button click, clicked on: ${index}` +
                    ` with following as ${!listItem.following}`
                );
                suggestedUsersList[index].following = !listItem.following;
              }}
            />
          ))}
        </TabPanel>
      </Box>
    </Container>
  );
}

export default Followers;
