import { makeStyles } from "@material-ui/styles";

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
  viewProfileButton: {
    backgroundColor: "#FF0000",
    color: "white",
    borderRadius: 30,
    marginBottom: "25px",
    marginTop: "25px",
    fontSize: "0.7em"
  }
});

export default cardStyles;
