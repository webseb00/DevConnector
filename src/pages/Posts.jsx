import React, { useState, useEffect } from 'react'
import { 
  PostItem, 
  PageLoader
} from '../components/'

import { 
  Container,
  Typography,
  Box,
  Pagination
} from '@mui/material'

import { 
  useFetchPostsMutation, 
  useFetchPostsCountQuery 
} from '../services/supabaseApi';

const Posts = () => {
  const postsPerPage = 4;

  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)

  const [fetchPosts, { isLoading }] = useFetchPostsMutation()
  const { data: counter } = useFetchPostsCountQuery()
  
  const getPosts = async range => {
    setData(null)

    const { data: posts } = await fetchPosts(range)
    setData(posts)
  }

  useEffect(() => {
    getPosts({ from: 0, to: postsPerPage-1 })
  }, [])
 
  const handleChange = (e, value) => {
    setPage(value)

    getPosts({ 
      from: value === 1 ? 0 : value*postsPerPage-postsPerPage, 
      to: value*postsPerPage-1
    })
  }

  if(isLoading) return <PageLoader />

  if(!data) return (
    <Box
      sx={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography textAlign="center" variant="h5" color="custom_silver.main">No posts found...</Typography>
    </Box>
  )

  return (
    <Container>
      <Typography
        variant="h4"
        textAlign="center"
        marginTop="1.2rem"
        color="custom_silver.main"
      >
        Posts
      </Typography>
      <Box
        margin="2rem 0"
      >
        {data.map((el, idx) => <PostItem key={idx} { ...el } />)}
      </Box>
      {counter && 
      <Pagination 
        count={Math.ceil(counter/postsPerPage)} 
        onChange={handleChange}
        color="primary"
        page={page}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          marginTop: '1rem',
          marginBottom: '2rem',
          color: 'red'
        }}
      />}
    </Container>
  )
}

export default Posts