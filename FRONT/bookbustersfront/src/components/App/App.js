//* Import des composants thématique de MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/rubik-wet-paint";
import "@fontsource/roboto";

//* Composants importés dans APP
import Routing from "../Routing/Routing";

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
        <Routing />
   </ThemeProvider>
  );
}

export default App;
