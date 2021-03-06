import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#DF1B1B",
    color: "white",
    borderRadius: "500px",
    marginBottom: "25px",
    marginTop: "25px"
  },
  buttonProgress: {
    //color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  dashBody: {
    display: "flex",
    justifyContent: "center",
    minWidth: "580px"
  },
  newItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "7vh",
    "& p": {
      textAlign: "center"
    }
  },
  input: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: "600px",
    width: "58vw",
    height: "70px",
    marginTop: "20px",
    borderRadius: "50px 50px 50px 50px",
    backgroundColor: "white",
    paddingLeft: "30px",
    boxShadow: "0 0 10px #ccc",
    "& input": {
      background: "transparent",
      width: "25vw",
      border: "none",
      fontSize: "20px",
      "&:focus": {
        outline: "none"
      },
      "&::placeholder": {
        color: "rgb(192, 192, 192)"
      }
    },
    "& button": {
      borderRadius: "50px 50px 50px 50px",
      width: "170px",
      margin: "10px 10px 10px 0px"
    }
  },
  verticalLine: {
    borderLeft: "solid thin rgb(212,212,212)",
    marginRight: "10px"
  },
  InputLabel: {
    width: "100px"
  },
  cardsTitleLeft: {
    display: "flex",
    marginBottom: "20px"
  },
  selectDropdown: {
    textAlignLast: "center"
  },
  selectText: {}
});

export default useStyles;
