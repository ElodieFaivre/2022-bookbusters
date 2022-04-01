import './header.scss';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  IconButton,
} from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="header">
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
           
          </Typography>
          <SearchBar />
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            open= "true"
          >
            <MenuIcon />
           </IconButton>
        </Toolbar>  
      </AppBar>
    </Box>
  );
}
