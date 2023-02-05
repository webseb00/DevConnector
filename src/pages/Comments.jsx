import React, { useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import {
  DashboardModal,
  PostForm
} from '../components'

import { 
  Container,
  Typography,
  Fab,
  Box,
  Button,
  Divider
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Comments = () => {

  const { id } = useParams()
  const [modal, setModal] = useState(false)

  return (
    <>
      <DashboardModal 
        modal={modal}
        setModal={setModal}
        component={<PostForm setModal={setModal} />}
        title="Create comment"
      />
      <Box sx={{ padding: '2rem 0' }}>
        <Container maxWidth="sm">
          <Button
            component={RouterLink}
            variant="contained"
            to="/posts"
            sx={{
              marginBottom: '1rem'
            }}
          >
            <ChevronLeftIcon />
            Back To Posts
          </Button>
          <Typography variant="h5">Comments: (2)</Typography>
          <Divider sx={{ margin: '2rem 0', backgroundColor: 'primary' }} />
          <Fab 
            onClick={() => setModal(true)}
            color="primary" 
            aria-label="add post"
            sx={{
              position: 'absolute',
              right: '40px',
              bottom: '40px'
            }}
          >
            <AddIcon />
          </Fab>
        </Container>
      </Box>
    </>
  )
}

export default Comments