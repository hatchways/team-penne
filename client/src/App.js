import React from 'react';
import SignInDialog from './components/SignInDialog'
import SignUpDialog from './components/SignUpDialog'
import { Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	div: {
		textAlign: "center"
	},
	title: {
		fontFamily: "Trebuchet MS, sans-serif",
		marginTop: "25px",
		marginBottom: "55px"
	},
	buttons: {
		fontFamily: "Trebuchet MS, sans-serif",
		marginBottom: "55px"
	}
});

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
    <Container classes={{root: classes.div,}}>
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
	</Container>
  );
}

export default App;