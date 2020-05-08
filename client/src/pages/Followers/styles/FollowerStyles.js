import { makeStyles } from "@material-ui/styles";

const followerStyles = makeStyles({
  cardBox: {
    backgroundColor: "white",
    minHeight: "50px",
    maxHeight: "68vh",
    minWidth: "100%",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,

    overflowY: "scroll"
  },
  followersContainer: {
    marginTop: 30,
    width: "60vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  tabBox: {
    marginTop: 25,
    minWidth: "100%",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0
  }
});

export default followerStyles;
