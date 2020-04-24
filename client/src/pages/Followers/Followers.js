import React from "react";
import { Container } from "@material-ui/core";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "./TabPanel";
import UserCard from "./UserCard";
import followerStyles from "./styles/FollowerStyles";
import noUserProfilePic from "../../assets/noUserProfilePic.png";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
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
    setLoadedUsers(false);
  };

  const getAllSuggestions = () => {
    fetch("/followers/get-all-suggestions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(res => {
        setSuggestedUsersList(res.usersList);
        localStorage.setItem("usersList", JSON.stringify(res.usersList));
      })
      .catch(err => {
        console.log(err);
        return;
      });
  };

  const getAllFollowingUsers = () => {
    fetch("/followers/get-following-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(res => {
        setUserListFollowing(res.followingList);
      })
      .catch(err => {
        console.log(err);
        return;
      });
  };

  const getAllFollowerUsers = () => {
    fetch("/followers/get-follower-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(res => {
        setUserListFollowers(res.followingList);
      })
      .catch(err => {
        console.log(err);
        return;
      });
  };

  const handleAllFollowChanges = (userId, following) => {
    //console.log(userId, following);
    fetch("/followers/set-follow-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: userId, following: following })
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleProfileRouting = userId => {
    // #TODO: handle changing route here.
  };

  React.useEffect(() => {
    if (!loadedUsers) {
      getAllSuggestions();
      getAllFollowingUsers();
      getAllFollowerUsers();
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
          {userListFollowers.length == 0 && <div>No followers yet.</div>}
          {userListFollowers.length != 0 &&
            userListFollowers.map((listItem, index) => (
              <UserCard
                userName={listItem.userName}
                profilePicImage={
                  listItem.userImageURL == null
                    ? noUserProfilePic
                    : listItem.userImageURL
                }
                cardType={"Followers"}
                handleProfileRouting={() => {
                  handleProfileRouting(listItem.userId);
                }}
                following={listItem.following}
                handleFollowerButtonClick={() => {
                  userListFollowers[index].following = !listItem.following;
                  //call function to update db
                  handleAllFollowChanges(listItem.userId, listItem.following);
                }}
              />
            ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {userListFollowing.length == 0 && (
            <div>
              Not following anyone yet. Head over to the suggested or followers
              tab and follow someone!
            </div>
          )}
          {userListFollowing.length != 0 &&
            userListFollowing.map((listItem, index) => (
              <UserCard
                userName={listItem.userName}
                profilePicImage={
                  listItem.userImageURL == null
                    ? noUserProfilePic
                    : listItem.userImageURL
                }
                cardType={"Following"}
                handleProfileRouting={() => {
                  handleProfileRouting(listItem.userId);
                }}
                following={listItem.following}
                handleFollowerButtonClick={() => {
                  userListFollowing[index].following = !listItem.following;
                  //call function to update db
                  handleAllFollowChanges(listItem.userId, listItem.following);
                }}
              />
            ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {suggestedUsersList.length == 0 && (
            <div>You currently have no suggestions.</div>
          )}
          {suggestedUsersList.length != 0 &&
            suggestedUsersList.map((listItem, index) => (
              <UserCard
                userName={listItem.userName}
                profilePicImage={
                  listItem.userImageURL == null
                    ? noUserProfilePic
                    : listItem.userImageURL
                }
                cardType={"Suggested"}
                handleProfileRouting={() => {
                  handleProfileRouting(listItem.userId);
                }}
                following={listItem.following}
                handleFollowerButtonClick={() => {
                  suggestedUsersList[index].following = !listItem.following;
                  //call function to update db
                  handleAllFollowChanges(listItem.userId, listItem.following);
                }}
              />
            ))}
        </TabPanel>
      </Box>
    </Container>
  );
}

export default Followers;
