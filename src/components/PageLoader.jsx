import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material'

const PageLoader = () => (
  <Box
    sx={{
      height: '90vh',
      backgroundColor: 'custom_slate.dark',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <CircularProgress sx={{ fontSize: '3.4rem' }} />
      <Typography 
        sx={{ 
          fontSize: '1.2rem', 
          marginTop: '.8rem', 
          color: 'custom_silver.main' 
        }}
      >
        Loading...
      </Typography>
    </Box>
  </Box>
)

export default PageLoader