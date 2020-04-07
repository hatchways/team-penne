import React, { Component } from "react";
import { Button, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import landingStyles from "./Styles/landingStyles";
import logo from "../../assets/logo.png";

class LandingPage extends Component {
  openLogin = () => {
    this.props.history.push("/login");
  };
  openSignUp = () => {
    this.props.history.push("/sign-up");
  };

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
            onClick={this.openLogin}
          >
            Sign In
          </Button>
        </Container>
        <Container>
          <Button
            classes={{ contained: classes.button }}
            variant="contained"
            onClick={this.openSignUp}
          >
            Sign Up
          </Button>
        </Container>
      </Container>
    );
  }
}

export default withStyles(landingStyles)(LandingPage);
