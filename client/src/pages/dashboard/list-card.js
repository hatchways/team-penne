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
        <CardContent>{name}</CardContent>
        <CardContent>Amount: {amount}</CardContent>
      </CardActionArea>
    </Card>
  );
}
