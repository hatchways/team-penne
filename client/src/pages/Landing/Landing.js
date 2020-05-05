import React from "react";
import { useHistory } from "react-router";
import { Button, Container } from "@material-ui/core";
import landingStyles from "./Styles/landingStyles";
import logo from "../../assets/logo.png";

function LandingPage(props) {
  const classes = landingStyles();
  const history = useHistory();

  const openLogin = () => {
    history.push("/login");
  };
  const openSignUp = () => {
    history.push("/sign-up");
  };

  return (
    <Container>
      <Container>
        <Container className={classes.loginContainer}>
          <Container style={{ marginTop: "20vh" }}>
            <img alt="logo" style={{ width: "100%" }} src={logo} />
          </Container>
          <Container>
            <Button
              style={{ marginTop: "35px" }}
              classes={{ contained: classes.button }}
              variant="contained"
              onClick={openLogin}
            >
              Sign In
            </Button>
          </Container>
          <Container>
            <Button
              style={{ marginTop: "35px" }}
              classes={{ contained: classes.button }}
              variant="contained"
              onClick={openSignUp}
            >
              Sign Up
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default LandingPage;
