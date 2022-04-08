//* Import des composants thématique de MUI
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import "@fontsource/rubik-wet-paint";
import "@fontsource/roboto";

//* Import des composants nécessaires à React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import Error from "../../pages/Error";
import Account from "../../pages/Account";
import Credits from "../../pages/Credits";
import Favorites from "../../pages/Favorites";
import Library from "../../pages/Library";
import Contact from "../../pages/Contact";
import MyAlerts from "../../pages/MyAlerts";
import SignInSide from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
// import ForgotPassword from "../ForgotPassword/ForgotPassword";
import AroundMe from "../../pages/AroundMe";
import AuthenticatedRoute from "../AuthenticatedRoute";

let themeOptions = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#263238",
    },
    secondary: {
      main: "#455a64",
    },
    info: {
      main: "#2e7d32",
    },
  },
  typography: {
    h6: {
      fontFamily: "Rubik Wet Paint",
    },
  },
});

themeOptions = responsiveFontSizes(themeOptions);

function App() {
  const jwt = localStorage.getItem("jwt");

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Routes toujours accessibles */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/Credits" element={<Credits />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AroundMe" element={<AroundMe />} />

          {/* Routes avec JWT*/}
          <Route
            element={
              <AuthenticatedRoute redirect="/SignIn" hasAccess={Boolean(jwt)} />
            }
          >
            <Route path="/Account" element={<Account />} />
            <Route path="/myAlerts" element={<MyAlerts />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/Library" element={<Library />} />
          </Route>

          {/* Routes SANS JWT*/}
          <Route
            element={
              <AuthenticatedRoute redirect="/" hasAccess={!Boolean(jwt)} />
            }
          >
            {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
            <Route path="/SignIn" element={<SignInSide />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
