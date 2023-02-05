import React from 'react'
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { 
  Typography,
  Box,
  Paper,
  Button,
  Divider
} from '@mui/material'

import { useFetchUserProfileQuery } from '../services/supabaseApi';
import { 
  AvatarWidget 
} from './index'

const PostItem = ({ user_id, id, text }) => {
  
  const { data, isLoading } = useFetchUserProfileQuery(user_id)
  if(isLoading) return 'loading'
  return (
    <Box
      component={Paper}
      elevation={1}
      maxWidth="600px"
      sx={{
        display: 'flex',
        padding: '.8rem',
        margin: '0 auto .8rem auto',
        overflowWrap: 'anywhere',
        minWidth: '400px'
      }}
    >
    {data?.data?.length && (
      <Box
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none'
        }}
        component={RouterLink}
        to={`/profile/${user_id}`}
      >
        <AvatarWidget 
          fullName={data.data[0].full_name}
          userID={user_id}
          size={80}
          url={data.data[0].avatar_url}
        />
        <Typography
          sx={{ 
            color: 'custom_slate.dark',
            textAlign: 'center',
            lineHeight: 1,
            marginTop: '5px',
          }}
        >
          {data.data[0].full_name.split(' ')[0]}
          <br />
          {data.data[0].full_name.split(' ')[1]}
        </Typography>
      </Box>
      )}
      <Divider sx={{ margin: '0 1rem' }} orientation='vertical' flexItem />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between' 
        }}>
        <Typography 
          sx={{ 
            fontSize: '.9rem', 
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >{text}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button
            type="button"
            variant="outlined"
            size="small"
            component={RouterLink}
            to={`/comments/${id}`}
          >
            Comments
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

PostItem.propTypes = {
  requiredObjectWithShape: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })
}

export default PostItem