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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

const pages = [
    {
        href: '/',
        style: {textDecoration: 'none' },
        sx: { color: { xs: 'black', md: 'white' } },
        label: 'Accueil',
    },
    {
        href: '/Contact',
        style: {textDecoration: 'none' },
        sx: { color: { xs: 'black', md: 'white' } },
        label: 'Contact',
    },
    {
        href: '/Credits',
        style: { textDecoration: 'none' },
        sx: { color: { xs: 'black', md: 'white' } },
        label: 'Crédits',
    },
    {
        href: '/LegalNotice',
        style: { textDecoration: 'none' },
        sx: { color: { xs: 'black', md: 'white' } },
        label: 'Mentions légales',
    },
    {
        href: '/signUp',
        style: { textDecoration: 'none' },
        sx: { color: { xs: 'black', md: 'white' }, display:{ xs:"none" ,md:"block"} },
        label: 'Inscription',
    },
    {
        href: '/SignIn',
        style: { textDecoration: 'none' ,color:"fff"},
        sx: { color: { xs: 'black', md: 'white' }, display:{ xs:"none" ,md:"block"} },
        label: 'Connexion',
    },
];

const settings = [
    {
        href: '/Account',
        style: {color:"#fff", textDecoration: 'none'},
        sx: { color:'black'},
        label: 'Account',
    },
    {
        href: '/MyAlerts',
        style: {color:"#fff", textDecoration: 'none'},
        sx:  { color:'black'},
        label: 'Mes alertes',
    },
    {
        href: '/Library',
        style: {color:"#fff", textDecoration: 'none'},
        sx:  { color:'black'},
        label: 'Ma bibliothèque',
    },
    {
        href: '/Favorites',
        style: {color:"#fff", textDecoration: 'none'},
        sx:  { color:'black'},
        label: 'Mes favoris',
    },
];

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
    <AppBar position="sticky" sx={{top:0, left:0, right:0}}>

      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link to="/" style={{color:"#fff", textDecoration: 'none'}}>
                BookBusters
              </Link>
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
              {/* key={`MenuItem-Desktop-NavBar--${index}`} */}
              {pages.map((page, index) => (
                        <MenuItem key={`MenuItem-Desktop-NavBar--${index}`} onClick={handleCloseNavMenu} sx={page.sx}>
                        <Link style={page.style} to={page.href} >
                            <Typography sx={page.sx} textAlign="center">{page.label}</Typography>
                        </Link>
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
            <Link to="/" underline="none" style={{color:"#fff", textDecoration: 'none'}}>
              BookBusters
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <MenuItem key={`MenuItem-babybel-NavBar--${index}`} onClick={handleCloseNavMenu} sx={page.sx}>
                <Link style={page.style} to={page.href}>
                  <Typography sx={page.sx} textAlign="center">{page.label}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
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
                <MenuItem key={`MenuItem-banana-NavBar--${index}`} onClick={handleCloseNavMenu} sx={setting.sx}>
                  <Link style={setting.style} to={setting.href} >
                    <Typography sx={setting.sx} textAlign="center">{setting.label}</Typography>
                  </Link>
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
