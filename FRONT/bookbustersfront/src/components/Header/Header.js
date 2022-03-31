import './header.scss';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  IconButton 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="header">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BookBusters
          </Typography>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 0 }}
          >
            <MenuIcon />
           </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
