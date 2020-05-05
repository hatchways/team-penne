import { makeStyles } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";

const cardStyles = makeStyles({
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1
  },
  cardManager: {
    minHeight: "100px",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardImageBox: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1
  },
  circular: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "& img": {
      maxWidth: "100%",
      width: "auto",
      height: "auto",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }
  },
  container: {
    textAlign: "center"
  },
  buttonFollow: {
    backgroundColor: "#FFFFFF",
    color: "black",
    borderRadius: 30,
    marginBottom: "25px",
    marginTop: "25px",
    fontSize: "0.7em",
    width: "100px",
    "&:hover": {
      backgroundColor: "#C6C6C6"
    }
  },
  buttonUnfollow: {
    color: "white",
    backgroundColor: red[500],
    borderRadius: 30,
    marginBottom: "25px",
    "&:hover": {
      backgroundColor: red[700]
    }
  }
});

export default cardStyles;
