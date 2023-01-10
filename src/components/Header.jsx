import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Groups2Icon from '@mui/icons-material/Groups2';
import LogoutIcon from '@mui/icons-material/Logout';
import { 
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Avatar 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { signOut } from '../features/auth/authSlice';

const Header = () => {

  const pages = ['posts', 'dashboard', 'developers']

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  const handleLogoutUser = () => {
    dispatch(signOut())

    handleCloseUserMenu();
    navigate('/')
  }

  const { user, session } = useSelector(state => state.auth)

  return (
    <AppBar 
      position="relative"
      sx={{
        zIndex: '99'
      }}  
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontSize: '1.5rem',
              fontFamily: 'monospace',
              fontWeight: 400,
              color: 'inherit',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
            edge="start"
          >
            <Groups2Icon
              sx={{
                fontSize: '2.8rem',
                paddingRight: '.6rem'
              }}
            />
            DevConnector
          </Typography>
          {
            !user && !session ?
            <Button 
              color="inherit"
              edge="end"
              variant="outlined"
              startIcon={<AccountCircleIcon />}
              component={RouterLink}
              to="/login"
              sx={{
                marginLeft: 'auto'
              }}
            >
              Sign In
            </Button>
            :
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    variant="outlined"
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={RouterLink}
                    to={`/${page}`}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Typography marginRight="10px" sx={{ display: { xs: 'none', md: 'flex' } }}>{user.user_metadata.full_name}</Typography>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="https://e7.pngegg.com/pngimages/926/34/png-clipart-computer-icons-user-profile-avatar-avatar-face-heroes.png" />
                    </IconButton>
                  </Tooltip>
                </Box>
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography 
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <AccountCircleIcon />
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogoutUser}>
                    <Typography 
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <LogoutIcon />
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
