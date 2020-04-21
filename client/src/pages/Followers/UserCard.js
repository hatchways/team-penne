import React from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Typography
} from "@material-ui/core";
import cardStyles from "./styles/CardStyles";

function UserCard(props) {
  const classes = cardStyles();

  // cardType use to set buttons
  const [cardType, setCardType] = React.useState(props.cardType);

  return (
    <Container
      className={classes.cardManager}
      raised={true}
      value={props.userName}
    >
      <div className={classes.cardImageBox}>
        <div className={classes.circular}>
          <img src={props.profilePicImage} alt="profile-pic" />
        </div>
      </div>
      <div
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          flexGrow: 2
        }}
      >
        {props.userName}
      </div>
      <div className={classes.buttonBox}>
        <Button
          classes={{ outlined: classes.viewProfileButton }}
          size="normal"
          variant="outlined"
        >
          View Profile
        </Button>
      </div>
      <Divider />
    </Container>
  );
}

export default UserCard;
