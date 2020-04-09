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

function LoginDialog(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailErrorOpen, setEmailErrorOpen] = React.useState(false);
  const [passwordErrorOpen, setPasswordErrorOpen] = React.useState(false);

  const classes = dialogStyles();

  const handleClose = () => {
    props.history.push(window.location.pathname.replace("/login", ""));
  };

  const openSignUp = () => {
    props.history.push(window.location.pathname.replace("/login", "/sign-up"));
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    let regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateLogin = () => {
    let emailValidated = validateEmail(email);
    let passwordValidated = validatePassword(password);
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
    if (emailValidated && passwordValidated) {
      localStorage.setItem("email", email);
      let status;
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, userPassword: password }),
      }).then((res) => {
        status = res.status;
        if (status === 200) {
          props.handleLogin();
          props.history.push("/dashboard");
        }
      });
    }
  };

  const enterSubmit = (event) => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 13) {
      validateLogin();
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
        disableTypography
        id="form-dialog-title"
      >
        Sign In
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
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
            id="email-sign-in-input"
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
            id="password-sign-in-input"
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
          onClick={validateLogin}
          variant="contained"
          size="large"
        >
          LOGIN
        </Button>
      </DialogActions>
      <Divider classes={{ root: classes.divider }} />
      <Typography classes={{ root: classes.footer }}>
        Don't have an account?{" "}
        <Link classes={{ root: classes.link }} onClick={openSignUp}>
          Create an Account
        </Link>
      </Typography>
    </Dialog>
  );
}

export default LoginDialog;
