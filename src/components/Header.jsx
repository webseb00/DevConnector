import React, { useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Groups2Icon from '@mui/icons-material/Groups2';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

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
  MenuItem
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { signOut } from '../features/auth/authSlice';

import AvatarWidget from './AvatarWidget';

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
  const { profile } = useSelector(state => state.profile)

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
            component={RouterLink}
            to="/"
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
                      <AvatarWidget 
                        fullName={user.user_metadata.full_name} 
                        size={40}
                        url={profile?.avatar_url}
                      />
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
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      component={RouterLink}
                      to="/dashboard"
                    >
                      <SettingsIcon sx={{ marginRight: '5px' }} />
                      Dashboard
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography 
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      component={RouterLink}
                      to={`/profile/${user.id}`}
                    >
                      <AccountCircleIcon sx={{ marginRight: '5px' }} />
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
                      <LogoutIcon sx={{ marginRight: '5px' }} />
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
