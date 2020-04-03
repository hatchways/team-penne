import React, { Component } from "react";
import { Button, Container } from '@material-ui/core';
import logo from '../media/logo.png';

class LandingPage extends Component {
  render() {
    return (
      <Container>
        <img alt="logo" src={logo}/>
        <br></br>
        <Button variant="contained" href="/login">
          Sign In
        </Button>
        <br></br>
        <Button variant="contained" href="/sign-up">
          Sign Up
        </Button>
	    </Container>
    );
  }
}

export default LandingPage;