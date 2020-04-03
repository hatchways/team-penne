import React from 'react';
import { Button, Collapse, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, 
  InputLabel, Link, OutlinedInput, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function LoginDialog() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailErrorOpen, setEmailErrorOpen] = React.useState(false);
  const [passwordErrorOpen, setPasswordErrorOpen] = React.useState(false);
  
  const handleClose = () => {
    window.location.href = "/";
  };
  
  const openSignUp = () => {
    window.location.href = "/sign-up";
  };

  const changeEmail = event => {
    setEmail(event.target.value);
  };

  const changePassword = event => {
    setPassword(event.target.value);
  };
  
  const validateEmail = email => {
    let regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
  };
  
  const validatePassword = password => {
    return password.length >= 6;
  };
  
  const validateLogin = () => {
    let emailValidated = validateEmail(email);
    let passwordValidated = validatePassword(password);
    if (!emailValidated) {
      setEmailErrorOpen(true);
    } if (emailValidated) {
      setEmailErrorOpen(false);
    } if (!passwordValidated) {
      setPasswordErrorOpen(true);
    } if (passwordValidated) {
      setPasswordErrorOpen(false);
    } if (emailValidated && passwordValidated) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  };

  const enterSubmit = event => {
    let keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == 13) {
      validateLogin();
    }
  };
  
  return (
  <Dialog scroll="body" fullWidth onClose={handleClose} aria-labelledby="form-dialog-title" open={true}>
    <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
    <DialogContent>
      <InputLabel>Your e-mail address:</InputLabel>
      <Container>
        <OutlinedInput
          onKeyPress={enterSubmit}
          onChange={changeEmail}
          placeholder="E-mail"
          id="email-sign-in-input"
          type="email"
        />
      </Container>
      <Collapse in={emailErrorOpen}>
        <Alert severity="error">Error: Email format is invalid.</Alert>
      </Collapse>
      <InputLabel>Password:</InputLabel>
      <Container>
        <OutlinedInput
          onKeyPress={enterSubmit}
          onChange={changePassword}
          id="password-sign-in-input"
          placeholder="Password"
          type="password"
        />
      </Container>
      <Collapse in={passwordErrorOpen}>
        <Alert severity="error">Error: Password must be six characters or longer.</Alert>
      </Collapse>
		</DialogContent>
    <DialogActions>
        <Button onClick={validateLogin} variant="contained" size="large">
            LOGIN
        </Button>
    </DialogActions>
    <Divider/>
    <Typography id="loginFooter">
        Don't have an account? <Link onClick={openSignUp}>Create an Account</Link>
    </Typography>
  </Dialog>
  );
}

export default LoginDialog;