import React from "react";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./themes/theme";
import { Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing/Landing";
import LoginDialog from "./pages/Dialogs/LoginDialog";
import SignUpDialog from "./pages/Dialogs/SignUpDialog";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={LoginDialog} />
          <Route path="/sign-up" component={SignUpDialog} />
          <Route path="/dashboard/login" component={LoginDialog} />
          <Route path="/dashboard/sign-up" component={SignUpDialog} />
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  );
}

export default App;
