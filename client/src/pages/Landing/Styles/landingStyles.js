import { makeStyles } from "@material-ui/styles";

const landingStyles = makeStyles({
  fullContainer: {
    display: "flex",
    flexDirection: "row"
  },
  loginContainer: {
    height: "100vh",
    width: "45vw",
    backgroundColor: "white",
    opacity: "0.9",
    textAlign: "center",
    padding: "25px"
  },
  descContainer: {
    backgroundColor: "white",
    textAlign: "right",
    padding: "35px",
    marginLeft: "5vw"
  },
  button: {
    width: "70%",
    backgroundColor: "#DF1B1B",
    color: "white",
    borderRadius: "500px",
    textTransform: "none"
  }
});

export default landingStyles;
