import { makeStyles } from "@material-ui/styles";

const profilePageStyles = makeStyles({
  container: {
    marginTop: "75px",
  },
  imageContainer: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    position: "relative",
    overflow: "hidden",
    marginRight: "15px",
    marginLeft: "30px",
    margingTop: "70px",
    "& img": {
      maxWidth: "100%",
      width: "auto",
      height: "auto",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
});

export default profilePageStyles;
