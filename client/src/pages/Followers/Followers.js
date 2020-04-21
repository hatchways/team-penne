import React from "react";
import { Container } from "@material-ui/core";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "./TabPanel";
import UserCard from "./UserCard";
import followerStyles from "./styles/FollowerStyles";

const userListFollowers = [
  {
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg"
  },
  {
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551"
  },
  {
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg"
  },
  {
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551"
  },
  {
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg"
  },
  {
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551"
  },
  {
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg"
  },
  {
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551"
  },
  {
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg"
  },
  {
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551"
  },
  {
    userName: "Frank Sinatra",
    userProfilePic:
      "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjg4MTE2MjM4/frank-sinatra-9484810-3-402.jpg"
  },
  {
    userName: "Michael Jackson",
    userProfilePic:
      "https://vignette.wikia.nocookie.net/real-life-heroes/images/2/2c/Michael_Jackson.jpg/revision/latest?cb=20191122190551"
  }
];
const userListFollowing = [
  {
    userName: "Spongebob Squarepants",
    userProfilePic:
      "https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt_400x400.jpg"
  },
  {
    userName: "Rock Monster",
    userProfilePic: "https://i.imgur.com/TZv6jjb.jpg"
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProfileRouting = () => {
    // #TODO: handle changing route here.
  };

  return (
    <Container className={classes.followersContainer}>
      <div>
        <Typography variant="h5">Followers</Typography>
      </div>
      <Container className={classes.tabBox}>
        <Tabs
          value={value}
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
        <TabPanel value={value} index={0}>
          {userListFollowers.map(listItem => (
            <UserCard
              userName={listItem.userName}
              profilePicImage={listItem.userProfilePic}
              cardType={"Followers"}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {userListFollowing.map(listItem => (
            <UserCard
              userName={listItem.userName}
              profilePicImage={listItem.userProfilePic}
              cardType={"Following"}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={2}>
          No Suggestions yet
        </TabPanel>
      </Box>
    </Container>
  );
}

export default Followers;
