import React from 'react'
import { useParams } from 'react-router-dom'

import { 
  Container,
  Box,
  Paper,
  Typography,
  Chip, 
  Stack,
  Divider,
  Link,
  Card,
  CardHeader,
  CardContent
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

import AvatarWidget from '../components/AvatarWidget'

import { 
  useFetchUserProfileQuery,
  useFetchUserSocialsQuery,
  useFetchUserEducationQuery,
  useFetchUserExperienceQuery
} from '../services/supabaseApi'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Profile = () => {

  const params = useParams()

  const { data: profileData, isLoading: isLoadingProfile } = useFetchUserProfileQuery(params.id)
  const { data: socialsData, isLoading: isLoadingSocials } = useFetchUserSocialsQuery(params.id)

  const { data: educationData } = useFetchUserEducationQuery(params.id)
  const { data: experienceData } = useFetchUserExperienceQuery(params.id)

  console.log(educationData)

  if(isLoadingProfile || isLoadingSocials) return (
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
        <Typography sx={{ fontSize: '1.2rem', marginTop: '.8rem', color: 'custom_silver.main' }}>Loading...</Typography>
      </Box>
    </Box>
  ) 
  
  const { instagram, linkedin, twitter, youtube, github } = socialsData.data[0]
  const { avatar_url, full_name, company, location, skills, status, user_name, website, bio } = profileData.data[0]

  return (
    <Box 
      
      sx={{
        padding: '2rem 0'
      }}
    >
      <Container maxWidth="md">
        <Box>
          <Paper
            elevation={1}
            sx={{
              backgroundColor: 'custom_silver.main',
              borderRadius: '2px',
              padding: '2rem 2rem 1rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '1rem',
              textAlign: 'center'
            }}
          >
            <AvatarWidget 
              fullName={full_name}
              userID={params.id}
              size={140}
              url={avatar_url}
            /> 
            <Typography
              variant="h4"
              color="custom_slate.dark"
              fontWeight="600"
            >
              {full_name}
            </Typography> 
            {status && <Typography>{status}</Typography>}
            {company && <Typography>Developer at {company}</Typography>}
            {location && <Typography>{location}</Typography>}
            <Divider />
            <Stack
              spacing={1}
              direction="row"
              marginTop="1rem"
            >
              {linkedin && 
              <Link href={`${linkedin}`} target="_blank">
                <LinkedInIcon 
                  sx={{ 
                    fontSize: '2rem', 
                    color: 'socials.linkedin',
                    transition: 'all .4s',
                    '&:hover': {
                      opacity: '.7'
                    }
                  }} 
                />
              </Link>}
              {twitter && 
              <Link href={`${twitter}`} target="_blank">
                <TwitterIcon 
                  sx={{ 
                    fontSize: '2rem', 
                    color: 'socials.twitter',
                    transition: 'all .4s',
                    '&:hover': {
                      opacity: '.7'
                    }
                  }} 
                />
              </Link>}
              {youtube && 
              <Link href={`${youtube}`} target="_blank">
                <YouTubeIcon 
                  sx={{ 
                    fontSize: '2rem', 
                    color: 'socials.youtube',
                    transition: 'all .4s',
                    '&:hover': {
                      opacity: '.7'
                    }
                  }} 
                />
              </Link>}
              {instagram && 
              <Link href={`${instagram}`} target="_blank">
                <InstagramIcon 
                  sx={{ 
                    fontSize: '2rem', 
                    color: 'socials.instagram',
                    transition: 'all .4s',
                    '&:hover': {
                      opacity: '.7'
                    }
                  }} 
                />
              </Link>}
              {github && 
              <Link href={`${github}`} target="_blank">
                <GitHubIcon 
                  sx={{ 
                    fontSize: '2rem', 
                    color: 'socials.github',
                    transition: 'all .4s',
                    '&:hover': {
                      opacity: '.7'
                    }
                  }} 
                />
              </Link>}
            </Stack>
          </Paper>
          {skills && (
            <Paper
              elevation={1}
              sx={{
                backgroundColor: 'custom_silver.main',
                padding: '.7rem 0',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '.4rem' }}>
                Skills
              </Typography>
              <Stack 
                direction="row" 
                flexWrap="wrap"
                justifyContent="center"
              >
                {skills.split(',').map((skill, idx) => (
                  <Chip 
                    key={idx} 
                    label={skill} 
                    sx={{ 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px', 
                      fontWeight: '500', 
                      margin: '.2rem',
                      backgroundColor: 'custom_slate.dark',
                      '&:hover': {
                        backgroundColor: 'primary.main'
                      },
                      color: 'custom_silver.main'
                    }} 
                  />
                ))}
              </Stack>
            </Paper>
          )}
          {bio && (
            <Paper
              elevation={1}
              sx={{
                backgroundColor: 'custom_silver.main',
                padding: '.7rem 0',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                textAlign="center"
                variant="h6"
                sx={{
                  marginBottom: '.4rem'
                }}
              >
                About {full_name.split(' ')[0]}
              </Typography>
              <Divider />
              <Typography
                textAlign="justify"
                variant="body1"
              >
                {bio}
              </Typography>
            </Paper>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: {
              xs: 'stretch',
              md: 'flex-start'
            },
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          <Box
            sx={{
              flex: '1',
              backgroundColor: 'custom_silver.main',
              borderRadius: '4px'
            }}
          >
            <Typography
              sx={{
                fontSize: '1.6rem',
                textAlign: 'center',
                color: 'primary.main'
              }}
            >
              Experience
            </Typography>
          </Box>
          <Box
            sx={{
              flex: '1',
              backgroundColor: 'custom_silver.main',
              borderRadius: '4px'
            }}
          >
            <Typography
              sx={{
                fontSize: '1.6rem',
                textAlign: 'center',
                color: 'primary.main'
              }}
            >
              Education
            </Typography>
            {educationData?.data && educationData.data.map((item, idx) => {
              const { current, degree, fieldOfStudy, from, to, school } = item
              return (
                <Box key={idx}>
                  <Divider />
                  <Box
                    sx={{
                      padding: '.5rem 1rem 1rem 1rem'
                    }}
                  >
                    <Typography 
                      fontSize="1.2rem" 
                      fontWeight="bold"
                      sx={{
                        color: 'custom_slate.dark'
                      }}
                    >
                      {school}
                    </Typography>
                    <Typography 
                      variant='body2' 
                      component="span" 
                      marginBottom=".4rem"
                      sx={{
                        display: 'inline-block'
                      }}
                    >
                      {`From: ${from} / To: ${current ? 'Current' : to}`}
                    </Typography>
                    <Typography><b>Degree:</b> {degree}</Typography>
                    <Typography><b>Field Of Study:</b> {fieldOfStudy}</Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile