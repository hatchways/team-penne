import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

export default function ListCard({ image, name, amount, addCard }) {
  return !addCard ? (
    <Card className="card">
      <CardActionArea>
        <CardMedia className="card-image" image={image} title={name} />
        <CardContent className="content">
          <Typography component="p">{name}</Typography>
          <Typography variant="body2" component="h1" color="textSecondary">
            {amount} items
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card className="add-card">
      <CardActionArea className="add-card__action-area">
        <AddIcon className="add-icon" color="primary" />
        <Typography className="add-list-card-text" component="h1">
          ADD NEW LIST
        </Typography>
      </CardActionArea>
    </Card>
  );
}
