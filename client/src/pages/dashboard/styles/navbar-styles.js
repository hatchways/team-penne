import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  nav: {
    backgroundColor: "white",
    color: "black",
    display: "flex",
    justifyContent: "space-between"
  },
  alignLeft: {
    display: "block",
    margin: "auto",
    fontWeight: "lighter",
    letterSpacing: "4px",
    marginLeft: "20px",
    fontSize: "20px",
    cursor: "pointer",
    "& p": {
      "&:hover": {
        fontWeight: "bolder"
      }
    }
  },
  sameRow: {
    float: "left",
    marginTop: "10%",
    marginLeft: "20px"
  },
  alignRight: {
    display: "flex",
    flexDirection: "row",
    "& p": {
      marginRight: "20px",
      flexDirection: "row",
      cursor: "pointer",
      fontWeight: "lighter",
      "&:hover": {
        fontWeight: "normal"
      }
    }
  },
  circular: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
    marginRight: "15px",
    marginLeft: "30px",
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
  }
});

export default useStyles;
