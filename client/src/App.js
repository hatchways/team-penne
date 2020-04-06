import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./themes/theme";
import { Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing/Landing";
import LoginDialog from "./pages/Dialogs/LoginDialog";
import SignUpDialog from "./pages/Dialogs/SignUpDialog";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewListDialog from "./pages/Dialogs/NewListDialog";
import NewProductDialog from "./pages/Dialogs/NewProductDialog";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginDialog} />
        <Route path="/sign-up" component={SignUpDialog} />
        <Route path="/create-new-list" component={NewListDialog} />
        <Route path="/add-new-product" component={NewProductDialog} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/create-new-list" component={NewListDialog} />
        <Route path="/dashboard/add-new-product" component={NewProductDialog} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
