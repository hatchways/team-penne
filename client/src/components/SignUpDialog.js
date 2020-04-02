import React from 'react';
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, 
  InputLabel, Link, OutlinedInput, Typography } from '@material-ui/core';
  import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dialog: {
        textAlign: "center",
		minHeight: "500px"
    },
    dialogTitle: {
		fontFamily: "Trebuchet MS, sans-serif",
		fontSize: "26px",
		fontWeight: "bold"
    },
    label: {
		color: "black",
		fontFamily: "Trebuchet MS, sans-serif",
		fontWeight: "bold"
    },
    inputInput: {
		textAlign: "center",
		fontFamily: "Trebuchet MS, sans-serif"
	},
	inputRoot: {
		width: "75%"
    },
    createAccountButton: {
		backgroundColor: "red",
		color: "white",
		fontFamily: "Trebuchet MS, sans-serif",
		fontWeight: "bold",
		borderRadius: "500px"
    },
    footer: {
		fontFamily: "Trebuchet MS, sans-serif"
    },
    link: {
		color: "red",
		fontWeight: "bold",
		cursor: "pointer"
	}
});

function SignUpDialog(props) {
  const classes = useStyles();
	const { onClose, open, openSignIn } = props;
  const handleClose = () => {
    onClose();
  };
  
  const [nameErrorOpen, setNameErrorOpen] = React.useState(false);
  const [emailErrorOpen, setEmailErrorOpen] = React.useState(false);
  const [passwordErrorOpen, setPasswordErrorOpen] = React.useState(false);

  const validateName = name => {
    return name.length > 0 && !name.match(/\d/);
  }

  const validateEmail = email => {
    let regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const validateSignUp = () => {
    let name = document.getElementById('name-sign-up-input').value;
    let email = document.getElementById('email-sign-up-input').value;
    let password = document.getElementById('password-sign-up-input').value;
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
    
  const linkClick = () => {
    handleClose();
    openSignIn();
  }

  return (
  <Dialog fullWidth classes={{root: classes.dialog,}} onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
    <DialogTitle disableTypography classes={{root: classes.dialogTitle,}} id="form-dialog-title">Sign Up</DialogTitle>
    <DialogContent>
      <InputLabel classes={{root: classes.label,}}>Your name:</InputLabel>
      <br></br>
      <OutlinedInput
        classes={{input: classes.inputInput, root: classes.inputRoot}}
			  placeholder="Name"
		    id="name-sign-up-input"
				type="name"
      />
      <Collapse in={nameErrorOpen}>
        <br></br>
        <br></br>
        <Alert severity="error">Error: Name must not be empty or contain a number.</Alert>
      </Collapse>
      <br></br>
      <br></br>
			<br></br>
      <InputLabel classes={{root: classes.label,}}>Your e-mail address:</InputLabel>
      <br></br>
      <OutlinedInput
        classes={{input: classes.inputInput, root: classes.inputRoot}}
        placeholder="E-mail"
        id="email-sign-up-input"
        type="email"
      />
      <Collapse in={emailErrorOpen}>
        <br></br>
        <br></br>
        <Alert severity="error">Error: Email format is invalid.</Alert>
      </Collapse>
      <br></br>
      <br></br>
      <br></br>
      <InputLabel classes={{root: classes.label,}}>Password:</InputLabel>
      <br></br>
      <OutlinedInput
          classes={{input: classes.inputInput, root: classes.inputRoot}}
          id="password-sign-up-input"
          placeholder="Password"
          type="password"
      />
      <Collapse in={passwordErrorOpen}>
        <br></br>
        <br></br>
        <Alert severity="error">Error: Password must be six characters or longer.</Alert>
      </Collapse>
    </DialogContent>
    <br></br>
    <br></br>
    <DialogActions style={{justifyContent: "center"}}>
        <Button onClick={validateSignUp} variant="contained" classes={{root: classes.createAccountButton,}} size="large">
            CREATE AN ACCOUNT
        </Button>
    </DialogActions>
    <br></br>
    <br></br>
    <Divider/>
    <br></br>
    <br></br>
    <Typography classes={{root: classes.footer,}}>
        Already a member? <Link onClick={linkClick} classes={{root: classes.link,}}>Sign In</Link>
    </Typography>
    <br></br>
    <br></br>
  </Dialog>
  )
}

export default SignUpDialog;