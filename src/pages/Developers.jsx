import React from 'react'

import { 
  Container,
  Typography,
  Box
} from '@mui/material'

import { ProfileItem, PageLoader } from '../components'
import { useFetchUsersQuery } from '../services/supabaseApi'

const Developers = () => {

  let { data, isLoading, isError } = useFetchUsersQuery()

  if(isError) return <p>An error occurred, content couldn't load</p>

  if(isLoading) return <PageLoader />

  const { data: users } = data

  return (
    <Container 
      maxWidth="lg"
      sx={{ minHeight: '90vh' }}
    >
      <Box 
        textAlign="center"
        marginTop="2rem"
        color="custom_slate.light"
        marginBottom="2rem"
      >
        <Typography
          variant="h4"
        >
          Developer Profiles
        </Typography>
        <Typography
          variant="body2"
          fontSize="1.2rem"
        >
          Connect with other developers
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: {
            xs: '80%',
            sm: '50%',
            md: '65%'
          },
          width: '100%',
          margin: '0 auto 2rem auto'
        }}
      >
        {users.length && users.map((user, idx) => <ProfileItem key={idx} { ...user } />)}
      </Box>
    </Container>
  )
}

export default Developers