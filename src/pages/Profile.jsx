import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'

import { 
  Container,
  Box,
  Paper,
  Typography,
  Chip, 
  Stack,
  Divider,
  Link,
  Button
} from '@mui/material'

import { 
  PageLoader,
  AvatarWidget
} from '../components'

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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PublicIcon from '@mui/icons-material/Public';

const Profile = () => {

  const params = useParams()

  const { data: profileData, isLoading: isLoadingProfile } = useFetchUserProfileQuery(params.id)
  const { data: socialsData, isLoading: isLoadingSocials } = useFetchUserSocialsQuery(params.id)

  const { data: educationData } = useFetchUserEducationQuery(params.id)
  const { data: experienceData } = useFetchUserExperienceQuery(params.id)

  if(isLoadingProfile || isLoadingSocials) return <PageLoader />
  
  const socials = socialsData?.data[0]
  const { full_name, company, location, skills, status, website, bio } = profileData?.data[0]

  return (
    <Box 
      sx={{
        padding: '2rem 0'
      }}
    >
      <Container maxWidth="sm">
        <Button
          component={RouterLink}
          variant="contained"
          to="/developers"
          sx={{
            marginBottom: '1rem'
          }}
        >
          <ChevronLeftIcon />
          Back To Profiles
        </Button>
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
            /> 
            <Typography
              variant="h4"
              color="custom_slate.dark"
              fontWeight="600"
            >
              {full_name}
            </Typography> 
            {status && company ? <Typography>{status} at {company}</Typography> : ''}
            {!status && company ? <Typography>{company}</Typography> : ''}
            {status && !company ? <Typography>{status}</Typography> : ''}
            {location && <Typography>{location}</Typography>}
            {website && 
              <Box sx={{ display: 'flex' }}>
                <Typography marginRight="5px">
                  <b>Website/Portoflio:</b>
                </Typography>
                <Link
                  href={`${website}`}
                  target="_blank"
                >
                  <PublicIcon />
                </Link>
              </Box>}
            <Stack
              spacing={1}
              direction="row"
            >
              {socials?.linkedin && 
              <Link href={`${socials.linkedin}`} target="_blank">
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
              {socials?.twitter && 
              <Link href={`${socials.twitter}`} target="_blank">
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
              {socials?.youtube && 
              <Link href={`${socials.youtube}`} target="_blank">
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
              {socials?.instagram && 
              <Link href={`${socials.instagram}`} target="_blank">
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
              {socials?.github && 
              <Link href={`${socials.github}`} target="_blank">
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
                sx={{
                  padding: '0 1.5rem 2rem 1.5rem'
                }}
              >
                {bio}
              </Typography>
            </Paper>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <Box
            sx={{
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
            {experienceData?.data && experienceData.data.map((item, idx) => {
              const { current, title, company, from, to } = item
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
                      {title}
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
                    <Typography><b>Company:</b> {company}</Typography>
                  </Box>
                </Box>
                )
              })}
          </Box>
          <Box
            sx={{
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