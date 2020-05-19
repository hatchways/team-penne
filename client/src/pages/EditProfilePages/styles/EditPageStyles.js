import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  profilePicture: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
    marginRight: "15px",
    marginLeft: "30px",
    marginBottom: "20px",
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
  root: {
    flexGrow: 1,
    display: "flex",
    height: "90vh"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column"
  }
}));

export default useStyles;
