import React from "react";
import { Container, Link } from "@material-ui/core";
import unauthorizedStyles from "./Styles/UnauthorizedStyles";

function Unauthorized(props) {
  const classes = unauthorizedStyles();

  const goToLandingPage = () => {
    props.history.push("/");
  };

  return (
    <Container>
      You are not authorized to access the dashboard! Go back to the{" "}
      <Link classes={{ root: classes.link }} onClick={goToLandingPage}>
        Login/Sign up page.
      </Link>
    </Container>
  );
}

export default Unauthorized;
