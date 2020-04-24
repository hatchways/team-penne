import React, { useEffect } from "react";
import { Button, Container, Divider } from "@material-ui/core";
import cardStyles from "./styles/CardStyles";
import clsx from "clsx";

function UserCard(props) {
  const classes = cardStyles();

  // cardType use to set buttons
  const [follow, setFollow] = React.useState(props.following);
  const [followText, setFollowText] = React.useState(
    props.following ? "Unfollow" : "Follow"
  );

  const buttonClassname = clsx({
    [classes.buttonUnfollow]: follow,
  });

  const handleButtonClick = () => {
    setFollow(!follow);
    props.handleFollowerButtonClick();
  };

  useEffect(() => {
    if (follow) setFollowText("Unfollow");
    else setFollowText("Follow");
  }, [follow]);

  return (
    <Container>
      <Container
        className={classes.cardManager}
        raised={true}
        value={props.userName}
      >
        <div className={classes.cardImageBox}>
          <div className={classes.circular}>
            <img
              src={props.profilePicImage}
              alt="profile-pic"
              onClick={props.handleProfileRouting}
            />
          </div>
        </div>
        <div
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            flexGrow: 2,
            cursor: "pointer",
          }}
          onClick={props.handleProfileRouting}
        >
          {props.userName}
        </div>
        <div className={classes.buttonBox}>
          <Button
            color="primary"
            onClick={handleButtonClick}
            className={buttonClassname}
            classes={{ contained: classes.buttonFollow }}
            size="normal"
            variant="contained"
          >
            {followText}
          </Button>
        </div>
      </Container>
      <Divider variant="fullWidth" />
    </Container>
  );
}

export default UserCard;
