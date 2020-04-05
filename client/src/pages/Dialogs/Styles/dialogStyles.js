import { makeStyles } from "@material-ui/styles";

const dialogStyles = makeStyles({
  dialogTitle: {
    paddingBottom: "0",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bolder",
  },
  dialogContent: {
    paddingBottom: "0",
  },
  inputLabel: {
    color: "black",
    fontWeight: "bolder",
    marginTop: "30px",
    textAlign: "center",
    marginBottom: "10px",
  },
  container: {
    textAlign: "center",
  },
  outlinedInputRoot: {
    width: "75%",
  },
  outlinedInputInput: {
    textAlign: "center",
  },
  alert: {
    marginTop: "10px",
  },
  dialogActions: {
    justifyContent: "center",
    height: "90px",
    paddingTop: "0",
  },
  button: {
    backgroundColor: "#DF1B1B",
    color: "white",
    fontWeight: "bold",
    borderRadius: "500px",
    marginBottom: "25px",
    marginTop: "25px",
  },
  divider: {
    marginBottom: "20px",
  },
  footer: {
    marginBottom: "15px",
    textAlign: "center",
  },
  link: {
    color: "#DF1B1B",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

export default dialogStyles;
