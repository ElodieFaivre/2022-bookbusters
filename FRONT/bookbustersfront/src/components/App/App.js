import './style.scss';
import { blueGrey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../Header/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header /> 
        <p>Bienvenue sur BookBusters !</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
