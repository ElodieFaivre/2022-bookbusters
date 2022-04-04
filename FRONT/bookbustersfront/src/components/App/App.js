//* Import des composants nécessaires à React Router
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "../../pages/Home";
import Error from "../../pages/Error";
import Account from "../../pages/Account"
import Credits from "../../pages/Credits"
import Favorites  from "../../pages/Favorites"
import LegalNotice from "../../pages/LegalNotice"
import Library from "../../pages/Library"
import Contact from "../../pages/Contact"
import MyAlerts from "../../pages/MyAlerts"

//* Import des composants thématique de MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/rubik-wet-paint";
import "@fontsource/roboto";
import SignInSide from "../../pages/SignInterface";

const themeOptions = createTheme(
     {
      palette: {
        type: 'dark',
        primary: {
          main: '#263238',
        },
        secondary: {
          main: '#455a64',
        },
        info: {
          main: '#2e7d32',
        },
      },
      typography: {
        h6: {
          fontFamily: 'Rubik Wet Paint',
        },
      },
    });


function App() {
  return (
    <ThemeProvider theme={themeOptions}>
     <CssBaseline />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="*" element={<Error />}/>
                <Route path="/Account" element={<Account />}/>
                <Route path="/SignInterface" element={<SignInSide />}/>
                <Route path="/Credits" element={<Credits />}/>
                <Route path="/Favorites" element={<Favorites />}/>
                <Route path="/LegalNotice" element={<LegalNotice />}/>
                <Route path="/Library" element={<Library />}/>
                <Route path="/Contact" element={<Contact />}/>
                <Route path="/myAlerts" element={<MyAlerts />}/>
            </Routes>
        </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
