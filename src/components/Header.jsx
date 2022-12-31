import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Groups2Icon from '@mui/icons-material/Groups2';

const Header = () => {

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
          <Button 
            color="inherit"
            edge="end"
            variant="outlined"
            href="/login"
            startIcon={<AccountCircleIcon />}
            sx={{
              marginLeft: 'auto'
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
