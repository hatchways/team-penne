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
  formControl: {
    textAlign: "center",
    width: "68%",
  },
  selectDropdown: {
    textAlignLast: "center",
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    marginTop:'30',
    maxWidth: "200px",
  },
  dropzone: {
    textAlign: "center",
    height: "200px",
    width: "100%",
    backgroundColor: "#fff",
    border: "2px dashed rgb(224, 224, 224)",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "16px",
    cursor: "pointer",
  },
  dropzoneBox: {
    paddingLeft: "25%",
    paddingRight: "25%",
  }
});

export default dialogStyles;
