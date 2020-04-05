import React from "react";
import {
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import dialogStyles from "./Styles/dialogStyles";

function SignUpDialog() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nameErrorOpen, setNameErrorOpen] = React.useState(false);
  const [emailErrorOpen, setEmailErrorOpen] = React.useState(false);
  const [passwordErrorOpen, setPasswordErrorOpen] = React.useState(false);

  const classes = dialogStyles();

  const handleClose = () => {
    window.location.href = window.location.href.replace("/sign-up", "");
  };

  const openSignIn = () => {
    window.location.href = window.location.href.replace("/sign-up", "/login");
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const validateName = (name) => {
    return name.length > 0 && !name.match(/\d/);
  };

  const validateEmail = (email) => {
    let regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateSignUp = () => {
    let nameValidated = validateName(name);
    let emailValidated = validateEmail(email);
    let passwordValidated = validatePassword(password);
    if (!nameValidated) {
      setNameErrorOpen(true);
    }
    if (nameValidated) {
      setNameErrorOpen(false);
    }
    if (!emailValidated) {
      setEmailErrorOpen(true);
    }
    if (emailValidated) {
      setEmailErrorOpen(false);
    }
    if (!passwordValidated) {
      setPasswordErrorOpen(true);
    }
    if (passwordValidated) {
      setPasswordErrorOpen(false);
    }
    if (nameValidated && emailValidated && passwordValidated) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      window.location.href = "/dashboard";
    }
  };

  const enterSubmit = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode == 13) {
      validateSignUp();
    }
  };

  return (
    <Dialog
      scroll="body"
      fullWidth
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      open={true}
    >
      <DialogTitle
        classes={{ root: classes.dialogTitle }}
        id="form-dialog-title"
      >
        Sign Up
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Your name:
        </InputLabel>
        <Container classes={{ root: classes.container }}>
          <OutlinedInput
            classes={{
              root: classes.outlinedInputRoot,
              input: classes.outlinedInputInput,
            }}
            onKeyPress={enterSubmit}
            onChange={changeName}
            placeholder="Name"
            id="name-sign-up-input"
            type="name"
          />
        </Container>
        <Collapse in={nameErrorOpen}>
          <Alert classes={{ root: classes.alert }} severity="error">
            Error: Name must not be empty or contain a number.
          </Alert>
        </Collapse>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Your e-mail address:
        </InputLabel>
        <Container classes={{ root: classes.container }}>
          <OutlinedInput
            classes={{
              root: classes.outlinedInputRoot,
              input: classes.outlinedInputInput,
            }}
            onKeyPress={enterSubmit}
            onChange={changeEmail}
            placeholder="E-mail"
            id="email-sign-up-input"
            type="email"
          />
        </Container>
        <Collapse in={emailErrorOpen}>
          <Alert classes={{ root: classes.alert }} severity="error">
            Error: Email format is invalid.
          </Alert>
        </Collapse>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Password:
        </InputLabel>
        <Container classes={{ root: classes.container }}>
          <OutlinedInput
            classes={{
              root: classes.outlinedInputRoot,
              input: classes.outlinedInputInput,
            }}
            onKeyPress={enterSubmit}
            onChange={changePassword}
            id="password-sign-up-input"
            placeholder="Password"
            type="password"
          />
        </Container>
        <Collapse in={passwordErrorOpen}>
          <Alert classes={{ root: classes.alert }} severity="error">
            Error: Password must be six characters or longer.
          </Alert>
        </Collapse>
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Button
          classes={{ contained: classes.button }}
          onClick={validateSignUp}
          variant="contained"
          size="large"
        >
          CREATE AN ACCOUNT
        </Button>
      </DialogActions>
      <Divider classes={{ root: classes.divider }} />
      <Typography classes={{ root: classes.footer }}>
        Already a member?{" "}
        <Link classes={{ root: classes.link }} onClick={openSignIn}>
          Sign In
        </Link>
      </Typography>
    </Dialog>
  );
}

export default SignUpDialog;
