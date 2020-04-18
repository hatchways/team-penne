import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 300
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    marginLeft: 5,
    marginBottom: 10,
    transform: "scale(1.5)",
    color: "green"
  },
  cardManager: {
    marginBottom: 20,
    marginLeft: 20,
    width: "500px",
    height: "150px",
    display: "flex",
    flexDirection: "row"
  },
  cardImageBox: {
    overflow: "hidden",
    maxWidth: "25%",
    maxHeight: "100%",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 2,
    border: "1px solid #eaeaea"
  },
  cardImg: {
    display: "block",
    width: "100%",
    height: "auto"
  },
  cardTextBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    width: "100%",
    maxHeight: "100%",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: "10pt",
    marginLeft: "0",
    marginRight: "0",
    fontWeight: "bold"
  },
  cardURL: {
    fontSize: "8pt",
    marginLeft: "0",
    marginRight: "0",
    fontWeight: "bold",
    color: "rgb(181, 181, 181)"
  },
  emptyCardManager: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    width: "500px",
    height: "150px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  emptyCardAligner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  recentDiscountsTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  pos: {
    marginBottom: 12
  },
  removeButton: {
    backgroundColor: "#FFFFFF",
    color: "black",
    fontWeight: "bold",
    borderRadius: 20,
    marginBottom: "25px",
    marginTop: "25px",
    fontSize: "0.7em"
  },
  seeAllButton: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center"
  },
  styledMenuItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default useStyles;
