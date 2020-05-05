import React, { useState } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import LandingPage from "./pages/Landing/Landing";
import LoginDialog from "./pages/Dialogs/LoginDialog";
import SignUpDialog from "./pages/Dialogs/SignUpDialog";
import Dashboard from "./pages/Dashboard/Dashboard";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

import clothingImg from "./assets/backgroundImages/clothing.jpeg";
import couchImg from "./assets/backgroundImages/couch.jpg";
import phoneImg from "./assets/backgroundImages/phone.jpg";

function App() {
  const [authenticated, setAuthentication] = useState(false);
  const [backgroundImgList, setBackgroundImgList] = useState([
    clothingImg,
    couchImg,
    phoneImg
  ]);
  const [backgroundImg, setBackgroundImg] = useState(
    backgroundImgList[
      Math.floor((Math.random() * 10) % backgroundImgList.length)
    ]
  );

  const handleLogin = () => {
    setAuthentication(true);
  };

  const handleLogout = () => {
    setAuthentication(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <ProtectedRoute
            path="/dashboard"
            authenticated={authenticated}
            handleLogout={handleLogout}
            component={Dashboard}
          />
          <div
            style={{
              height: "100vh",
              width: "100vw",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${backgroundImg})`,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route
              path="/login"
              render={props => (
                <LoginDialog {...props} handleLogin={handleLogin} />
              )}
            />
            <Route
              path="/sign-up"
              render={props => (
                <SignUpDialog {...props} handleLogin={handleLogin} />
              )}
            />
            <Route path="/" component={LandingPage} />
          </div>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
