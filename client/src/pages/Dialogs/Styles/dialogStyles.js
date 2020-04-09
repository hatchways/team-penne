import { makeStyles } from "@material-ui/styles";

const dialogStyles = makeStyles({
  dialogTitle: {
    paddingBottom: "0",
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bolder",
  },
  alert: {
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#DF1B1B",
    color: "white",
    borderRadius: "500px",
    marginBottom: "25px",
    marginTop: "25px",
  },
  cardManager: {
    marginTop: 20,
    height: "100%",
  },
  cardDivider: {
    display: 'flex',
    alignItems: "flex-start",
    padding: 5,
    textAlign: "left",
  },
  cardImageBox: {
    overflow: 'hidden',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    maxWidth: "25%",
    height: "100%",
  },
  cardImg: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  cardTextBox: {
    marginLeft: "10px",
  },
  cardTitle:{
    fontSize: "10pt",
    marginLeft: "0",
    marginRight: "0",
    fontWeight: "bold",
  },
  cardURL:{
    fontSize: "8pt",
    marginLeft: "0",
    marginRight: "0",
    fontWeight: "bold",
    color: "rgb(181, 181, 181)",
  },
  container: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
    height: "90px",
    paddingTop: "0",
  },
  dialogContent: {
    paddingBottom: "0",
    textAlign: "center"
  },
  dialogTitle: {
    paddingBottom: "0",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bolder",
  },
  divider: {
    marginBottom: "20px",
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
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  dropzoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "center",
  },
  dropzoneInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  dropzoneOuter: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 2,
    marginRight: 8,
    maxWidth: "90%",
    height: 175,
    padding: 4,
    boxSizing: 'border-box',
    textAlign: "center",
  },
  footer: {
    marginBottom: "15px",
    textAlign: "center",
  },
  formControl: {
    textAlign: "center",
    width: "68%",
  },
  img:{
    display: 'block',
    width: 'auto',
    height: '100%',
  },
  inputLabel: {
    color: "black",
    fontWeight: "bolder",
    marginTop: "30px",
    textAlign: "center",
    marginBottom: "10px",
  },
  link: {
    color: "#DF1B1B",
    fontWeight: "bold",
    cursor: "pointer",
  },
  outlinedInputInput: {
    textAlign: "center",
  },
  outlinedInputRoot: {
    width: "75%",
  },
  selectDropdown: {
    textAlignLast: "center",
  },
  removeButton: {
    backgroundColor: "#FFFFFF",
    color: "black",
    fontWeight: "bold",
    borderRadius: 20,
    marginBottom: "25px",
    marginTop: "25px",
    fontSize: "0.7em",
  },
});

export default dialogStyles;
