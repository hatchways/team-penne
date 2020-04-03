import React from 'react';
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, 
  InputLabel, Link, OutlinedInput, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function LoginDialog() {
  const [emailErrorOpen, setEmailErrorOpen] = React.useState(false);
  const [passwordErrorOpen, setPasswordErrorOpen] = React.useState(false);
  
  const handleClose = () => {
    window.location.href = "/";
  };
  const openSignUp = () => {
    window.location.href = "/sign-up";
  }
  
  const validateEmail = email => {
    let regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
  };
  
  const validatePassword = password => {
    return password.length >= 6;
  };
  
  const validateLogin = () => {
    let email = document.getElementById('email-sign-in-input').value;
    let password = document.getElementById('password-sign-in-input').value;
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
  
  return (
  <Dialog fullWidth onClose={handleClose} aria-labelledby="form-dialog-title" open={true}>
    <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
    <DialogContent>
      <InputLabel>Your e-mail address:</InputLabel>
      <OutlinedInput
        placeholder="E-mail"
        id="email-sign-in-input"
        type="email"
      />
      <Collapse in={emailErrorOpen}>
        <Alert severity="error">Error: Email format is invalid.</Alert>
      </Collapse>
      <InputLabel>Password:</InputLabel>
      <OutlinedInput
        id="password-sign-in-input"
        placeholder="Password"
        type="password"
      />
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