import React from "react";
import { Container } from "@material-ui/core";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "./TabPanel";
import UserCard from "./UserCard";
import followerStyles from "./styles/FollowerStyles";

const dummyUserListFollowers = [
  {
    userId: 1,
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg",
    following: false
  },
  {
    userId: 2,
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551",
    following: false
  },
  {
    userId: 1,
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg",
    following: false
  },
  {
    userId: 2,
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551",
    following: false
  },
  {
    userId: 1,
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg",
    following: true
  },
  {
    userId: 2,
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551",
    following: false
  },
  {
    userId: 1,
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg",
    following: true
  },
  {
    userId: 2,
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551",
    following: false
  }
];
const dummyUserListFollowing = [
  {
    userId: 3,
    userName: "Spongebob Squarepants",
    userProfilePic:
      "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt_400x400.jpg",
    following: true
  },
  {
    userId: 4,
    userName: "Rock Monster",
    userProfilePic: "https://i.imgur.com/TZv6jjb.jpg",
    following: true
  },
  {
    userId: 1,
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg",
    following: true
  }
];

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

function Followers(props) {
  const classes = followerStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [userListFollowers, setUserListFollowers] = React.useState(
    dummyUserListFollowers
  );
  const [userListFollowing, setUserListFollowing] = React.useState(
    dummyUserListFollowing
  );
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const handleProfileRouting = userId => {
    // #TODO: handle changing route here.
    console.log("Clicked on user with userId: ", userId);
  };

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
          <Tab disabled label="Suggested" {...a11yProps(2)} />
        </Tabs>
      </Container>
      <Box boxShadow={3} className={classes.cardBox}>
        <TabPanel value={tabValue} index={0}>
          {userListFollowers.map((listItem, index) => (
            <UserCard
              userName={listItem.userName}
              profilePicImage={listItem.userProfilePic}
              cardType={"Followers"}
              handleProfileRouting={() => {
                handleProfileRouting(listItem.userId);
              }}
              following={listItem.following}
              handleFollowerButtonClick={() => {
                console.log(
                  `In handle follower button click, clicked on: ${index}` +
                    ` with following as ${!listItem.following}`
                );
                userListFollowers[index].following = !listItem.following;
              }}
            />
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {userListFollowing.map((listItem, index) => (
            <UserCard
              userName={listItem.userName}
              profilePicImage={listItem.userProfilePic}
              cardType={"Following"}
              handleProfileRouting={() => {
                handleProfileRouting(listItem.userId);
              }}
              following={listItem.following}
              handleFollowerButtonClick={() => {
                console.log(
                  `In handle follower button click, clicked on: ${index}` +
                    ` with following as ${!listItem.following}`
                );
                userListFollowing[index].following = !listItem.following;
              }}
            />
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          No Suggestions yet
        </TabPanel>
      </Box>
    </Container>
  );
}

export default Followers;
