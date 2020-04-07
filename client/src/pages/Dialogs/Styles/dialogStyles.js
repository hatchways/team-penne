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
    textAlign: "center"
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
  dropzoneInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },
  img:{
    display: 'block',
    width: 'auto',
    height: '100%',
  },  
});

export default dialogStyles;
