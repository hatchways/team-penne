import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import landingStyles from "./Styles/landingStyles";
import logo from "../../assets/logo.png";

class LandingPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container classes={{ root: classes.container }}>
        <Container>
          <img alt="logo" src={logo} />
        </Container>
        <Container>
          <Button
            classes={{ contained: classes.button }}
            variant="contained"
            href="/login"
          >
            Sign In
          </Button>
        </Container>
        <Container>
          <Button
            classes={{ contained: classes.button }}
            variant="contained"
            href="/sign-up"
          >
            Sign Up
          </Button>
        </Container>
      </Container>
    );
  }
}

export default withStyles(landingStyles)(LandingPage);
