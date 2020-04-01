import './App.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	buttons: {
		fontFamily: "Trebuchet MS, sans-serif",
		marginBottom: "55px"
	},
	title: {
		fontFamily: "Trebuchet MS, sans-serif",
		marginTop: "25px",
		marginBottom: "55px"
	},
	loginButton: {
		backgroundColor: "red",
		color: "white",
		fontFamily: "Trebuchet MS, sans-serif",
		fontWeight: "bold",
		borderRadius: "500px"
	},
	dialog: {
		textAlign: "center"
	},
	dialogTitle: {
		fontFamily: "Trebuchet MS, sans-serif",
		fontSize: "26px",
		fontWeight: "bold"
	},
	inputInput: {
		textAlign: "center",
		fontFamily: "Trebuchet MS, sans-serif"
	},
	inputRoot: {
		width: "75%"
	},
	label: {
		color: "black",
		fontFamily: "Trebuchet MS, sans-serif",
		fontWeight: "bold"
	},
	link: {
		color: "red",
		fontWeight: "bold",
		cursor: "pointer"
	},
	footer: {
		fontFamily: "Trebuchet MS, sans-serif"
	}
});

function SignInDialog(props) {
	const classes = useStyles();
	const { onClose, open, openSignUp } = props;
  const handleClose = () => {
    onClose();
	};

	const linkClick = () => {
		handleClose();
		openSignUp();
	};

  return (
    <Dialog fullWidth classes={{root: classes.dialog,}} onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
      <DialogTitle disableTypography classes={{root: classes.dialogTitle,}} id="form-dialog-title">Sign In</DialogTitle>
			<DialogContent>
				<InputLabel classes={{root: classes.label,}}>Your e-mail address:</InputLabel>
				<br></br>
				<OutlinedInput
				  classes={{input: classes.inputInput, root: classes.inputRoot}}
				  placeholder="E-mail"
					id="email-input"
					type="email"
				/>
				<br></br>
				<br></br>
				<br></br>
				<InputLabel className={classes.label}>Password:</InputLabel>
				<br></br>
				<OutlinedInput
				  classes={{input: classes.inputInput, root: classes.inputRoot}}
					id="password-input"
					placeholder="Password"
					type="password"
				/>
			</DialogContent>
			<br></br>
			<br></br>
			<DialogActions style={{justifyContent: "center"}}>
				<Button variant="contained" classes={{root: classes.loginButton,}} size="large">
					LOGIN
				</Button>
			</DialogActions>
			<br></br>
			<br></br>
			<Divider/>
			<br></br>
			<br></br>
			<Typography classes={{root: classes.footer,}}>
				Don't have an account? <Link onClick={linkClick} classes={{root: classes.link,}}>Create an Account</Link>
			</Typography>
			<br></br>
			<br></br>
    </Dialog>
  );
}

function SignUpDialog(props) {
	const classes = useStyles();
	const { onClose, open, openSignIn } = props;
  const handleClose = () => {
    onClose();
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
				<br></br>
				<br></br>
				<br></br>
				<InputLabel className={classes.label}>Password:</InputLabel>
				<br></br>
				<OutlinedInput
				  classes={{input: classes.inputInput, root: classes.inputRoot}}
					id="password-sign-up-input"
					placeholder="Password"
					type="password"
				/>
			</DialogContent>
			<br></br>
			<br></br>
			<DialogActions style={{justifyContent: "center"}}>
				<Button variant="contained" classes={{root: classes.loginButton,}} size="large">
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

function App() {
  const classes = useStyles();
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);

  const handleSignInOpen = () => {
    setSignInOpen(true);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  return (
    <div className="App">
      <Typography classes={{root: classes.title,}} variant="h3" color="primary">
        DEALS MATE
      </Typography>
			<Button classes={{root: classes.buttons,}} variant="contained" color="primary" onClick={handleSignInOpen}>
				Sign In
			</Button>
			<br></br>
			<Button classes={{root: classes.buttons,}} variant="contained" color="primary" onClick={handleSignUpOpen}>
				Sign Up
			</Button>
      <SignInDialog open={signInOpen} openSignUp={handleSignUpOpen} onClose={handleSignInClose}/>
      <SignUpDialog open={signUpOpen} openSignIn={handleSignInOpen} onClose={handleSignUpClose}/>
    </div>
  );
}

export default App;