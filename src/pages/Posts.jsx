import React, { useState } from 'react'
import { 
  PostItem, 
  PageLoader, 
  DashboardModal, 
  PostForm 
} from '../components/'

import { 
  Container,
  Typography,
  Box,
  Fab
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useFetchPostsQuery } from '../services/supabaseApi';

const Posts = () => {

  const [modal, setModal] = useState(false)
  const { data, isLoading } = useFetchPostsQuery()
  console.log(data)

  return (
    <>
      <DashboardModal 
        modal={modal}
        setModal={setModal}
        component={<PostForm />}
        title="Create post"
      />
      <Container>
        <Typography
          variant="h4"
          textAlign="center"
          marginTop="1.2rem"
        >
          Posts
        </Typography>
        {data?.length && data.map((el, idx) => <PostItem key={idx} { ...el } />)}
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
    </>
  )
}

export default Posts