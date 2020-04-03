import React from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { landingTheme, dialogTheme } from "./themes/theme";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginDialog from './pages/LoginDialog'
import SignUpDialog from './pages/SignUpDialog'

function App() {
	return (
		<Container>
			<ThemeProvider theme={landingTheme}>
				<BrowserRouter>
					<Route path="/" component={LandingPage} />
				</BrowserRouter>
			</ThemeProvider>
			<ThemeProvider theme={dialogTheme}>
				<BrowserRouter>
					<Route path="/login" component={LoginDialog} />
					<Route path="/sign-up" component={SignUpDialog} />
				</BrowserRouter>
			</ThemeProvider>
		</Container>
	);
}

export default App;