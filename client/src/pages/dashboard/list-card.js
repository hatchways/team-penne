import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles/list-card-styles";

export default function ListCard({ image, name, amount, addCard }) {
  const classes = useStyles();
  return !addCard ? (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.cardImage} image={image} title={name} />
        <CardContent className={classes.content}>
          <Typography component="p">{name}</Typography>
          <Typography variant="body2" component="h1" color="textSecondary">
            {amount} items
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card className={classes.addCard}>
      <CardActionArea>
        <AddIcon color="primary" />
        <Typography className={classes.addListCardText} component="h1">
          ADD NEW LIST
        </Typography>
      </CardActionArea>
    </Card>
  );
}
