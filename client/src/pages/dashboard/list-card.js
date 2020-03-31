import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

export default function ListCard({ image, name, amount }) {
  return (
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
  );
}
