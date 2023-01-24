import React from 'react'
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  Paper
} from '@mui/material'

import AvatarWidget from './AvatarWidget'
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';

const BoxItem = styled.div`
  display: flex;
  align-items: center;
  padding: .2rem .5rem;
  background: ${({ palette }) => palette.custom_slate.light};
  margin-bottom: .2rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: .9rem;
  border: 1px solid ${({ palette }) => palette.custom_slate.main};
  color: ${({ palette }) => palette.custom_slate.dark};
`

const ProfileItem = ({ id, avatar_url, location, company, full_name, skills }) => {

  const theme = useTheme()
  
  return (
    <Box 
      component={Paper}
      elevation={1}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        padding: '1.2rem',
        backgroundColor: 'custom_silver.main',
        marginBottom: '1rem',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: {
            xs: 'column',
            md: 'row'
          }
        }}
      >
        <AvatarWidget 
          fullName={full_name}
          userID={id}
          size={120}
          url={avatar_url || ''}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginLeft: {
              xs: 0,
              md: '1rem'
            }
          }}
        >
          <Box
            marginBottom="1rem"
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left'
              }
            }}
          >
            <Typography
              fontSize="1.2rem"
              fontWeight="600"
              color="custom_slate.dark"
            >
              {full_name}
            </Typography>
            {status && <Typography>{status}</Typography>}
            {company && <Typography>{company}</Typography>}
            {location && <Typography>{location}</Typography>}
          </Box>
          <Button
            component={RouterLink}
            to={`/profile/${id}`}
            variant="contained"
          >
            View profile
          </Button>
        </Box>
      </Box>
      {skills.length ? (
        <Box
          maxWidth="220px"
          width="100%"
          sx={{
            marginTop: {
              xs: '1rem',
              md: 0
            }
          }}
        >
          <Typography 
            marginBottom=".4rem" 
            textAlign="center"
            fontWeight="600"
          >
            Skills
          </Typography>
          <Box>
            {skills.split(',').slice(0, 3).map((skill, idx) => (
              <BoxItem palette={theme.palette} key={idx}>
                {skill.toUpperCase()}
              </BoxItem>
            ))}
          </Box>
        </Box>
      ) : ''}
    </Box>
  )
}

ProfileItem.propTypes = {
  id: PropTypes.string.isRequired,
  avatar_url: PropTypes.string,
  location: PropTypes.string,
  company: PropTypes.string,
  full_name: PropTypes.string.isRequired,
  skills: PropTypes.string,
  status: PropTypes.string
}

export default ProfileItem