import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";


const pages = [

    <Link to="/" style={{color:"#fff", textDecoration: 'none'}}>
        <Typography sx={{ color: { xs: 'black', md: 'white' } }}>
            Accueil
        </Typography>
    </Link>,

    <Link to="/MyAlerts" style={{color:"#fff", textDecoration: 'none'}} >
      <Typography sx={{ color: { xs: 'black', md: 'white' } }}>
        Mes alertes
      </Typography>
    </Link>,

    <Link to="/Contact"  style={{color:"#fff", textDecoration: 'none'}}>
      <Typography sx={{ color: { xs: 'black', md: 'white' } }}>
        Contact
      </Typography>
    </Link>,

    <Link to="/Credits" style={{color:"#fff", textDecoration: 'none'}} >
      <Typography sx={{ color: { xs: 'black', md: 'white' } }}>
        Crédits
      </Typography>
    </Link>,

    <Link to="/LegalNotice" style={{color:"#fff", textDecoration: 'none'}}>
      <Typography sx={{ color: { xs: 'black', md: 'white' } }}>
        Mentions légales
      </Typography>
    </Link>
];

const settings = [
    <Link to="/Account" style={{color:"#fff", textDecoration: 'none'}}>
      <Typography sx={{ color:'black'}}>
        Mon compte
      </Typography>
    </Link>,

    <Link to="/Library"  style={{color:"#fff", textDecoration: 'none'}}>
      <Typography sx={{ color:'black'}}>
        Ma bibliothèque
      </Typography>
    </Link>,

    <Link to="/Favorites" style={{color:"#fff", textDecoration: 'none'}}>
      <Typography sx={{ color:'black' }}>
        Mes favoris
      </Typography>
    </Link>,

    'Déconnexion'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            BookBusters
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                {console.log(index)}
                <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            BookBusters
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
