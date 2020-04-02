import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  dashBody: {
    display: "flex",
    justifyContent: "center"
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
    minWidth: "530px",
    width: "58vw",
    height: "70px",
    marginTop: "20px",
    borderRadius: "50px 50px 50px 50px",
    backgroundColor: "white",
    paddingLeft: "30px",
    "& input": {
      background: "transparent",
      width: "25vw",
      border: "none",
      fontSize: "20px",
      color: "rgb(192, 192, 192)",
      "&:focus": {
        outline: "none"
      },
      "&::placeholder": {
        color: "rgb(192, 192, 192)"
      }
    },
    "& button": {
      marginRight: "30px",
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
  }
});

export default useStyles;
