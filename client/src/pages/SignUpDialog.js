import React from 'react';
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, 
  InputLabel, Link, OutlinedInput, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function SignUpDialog() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nameErrorOpen, setNameErrorOpen] = React.useState(false);
  const [emailErrorOpen, setEmailErrorOpen] = React.useState(false);
  const [passwordErrorOpen, setPasswordErrorOpen] = React.useState(false);
  
  const handleClose = () => {
    window.location.href = "/";
  };

  const openSignIn = () => {
    window.location.href = "/login";
  };

  const changeName = event => {
    setName(event.target.value);
  }

  const changeEmail = event => {
    setEmail(event.target.value);
  };

  const changePassword = event => {
    setPassword(event.target.value);
  };

  const validateName = name => {
    return name.length > 0 && !name.match(/\d/);
  };

  const validateEmail = email => {
    let regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const validateSignUp = () => {
    let nameValidated = validateName(name);
    let emailValidated = validateEmail(email);
    let passwordValidated = validatePassword(password);
    if (!nameValidated) {
      setNameErrorOpen(true);
    } if (nameValidated) {
      setNameErrorOpen(false);
    } if (!emailValidated) {
      setEmailErrorOpen(true);
    } if (emailValidated) {
      setEmailErrorOpen(false);
    } if (!passwordValidated) {
      setPasswordErrorOpen(true);
    } if (passwordValidated) {
      setPasswordErrorOpen(false);
    } if (nameValidated && emailValidated && passwordValidated) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  };

  return (
  <Dialog fullWidth onClose={handleClose} aria-labelledby="form-dialog-title" open={true}>
    <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
    <DialogContent>
      <InputLabel>Your name:</InputLabel>
      <OutlinedInput
        onChange={changeName}
			  placeholder="Name"
		    id="name-sign-up-input"
				type="name"
      />
      <Collapse in={nameErrorOpen}>
        <Alert severity="error">Error: Name must not be empty or contain a number.</Alert>
      </Collapse>
      <InputLabel>Your e-mail address:</InputLabel>
      <OutlinedInput
        onChange={changeEmail}
        placeholder="E-mail"
        id="email-sign-up-input"
        type="email"
      />
      <Collapse in={emailErrorOpen}>
        <Alert severity="error">Error: Email format is invalid.</Alert>
      </Collapse>
      <InputLabel>Password:</InputLabel>
      <OutlinedInput
        onChange={changePassword}
        id="password-sign-up-input"
        placeholder="Password"
        type="password"
      />
      <Collapse in={passwordErrorOpen}>
        <Alert severity="error">Error: Password must be six characters or longer.</Alert>
      </Collapse>
    </DialogContent>
    <DialogActions>
        <Button onClick={validateSignUp} variant="contained" size="large">
            CREATE AN ACCOUNT
        </Button>
    </DialogActions>
    <Divider/>
    <Typography>
        Already a member? <Link onClick={openSignIn}>Sign In</Link>
    </Typography>
  </Dialog>
  )
}

export default SignUpDialog;