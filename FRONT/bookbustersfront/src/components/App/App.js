import './style.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Button>
        </Stack>
      </header>
    </div>
  );
}

export default App;
