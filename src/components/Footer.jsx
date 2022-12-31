import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Footer = () => {

  const date = new Date();

  return (
    <Box
      component="footer"
      backgroundColor="primary.main"
      padding=".8rem 0"
      textAlign="center"
    >
      <Container
        maxWidth="xl"
      >
        <Typography
          color="white"
          fontWeight="500"
        >
          Copyright &copy; {date.getFullYear()} | DevConnector 
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer