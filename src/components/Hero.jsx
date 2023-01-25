import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import HeroBG from '../assets/hero_bg.jpg'
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import CardForm from './CardForm';
import { useSelector } from 'react-redux';

const Hero = () => {

  const auth = useSelector(state => state.auth)

  const theme = useTheme()
  const mainColor = theme.palette.primary.main
  
  return (
    <Box
      component="div"
      minHeight="90vh"
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url(${HeroBG}) `,
        backgroundPosition:"center",
        backgroundSize:"cover"
      }}
    >
      <Container
        maxWidth="xl"
      >
        <Box
          display="flex"
          justifyContent={`${auth.user ? 'center' : 'space-around'}`}
          alignItems="center"
          flexWrap="wrap"
          padding="2.4rem 0"
        >
          <Box
            component="div"
            padding="1rem"
            maxWidth="500px"
          >
            <Typography
              variant="h1"
              color="white"
              lineHeight="85%"
              textAlign="center"
              marginBottom="1.2rem"
              sx={{
                fontSize: {
                  xs: '2.2rem',
                  md: '3.2rem'
                }
              }}
            >
              Welcome to Dev<SubHeading primary={mainColor}>Connector</SubHeading>
            </Typography>
            <Typography
              variant="subtitle2"
              color="white"
              textAlign="justify"
              fontWeight="300"
              lineHeight="1.2"
              sx={{
                fontSize: {
                  xs: '1rem',
                  md: '1.2rem'
                }
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sequi libero asperiores, aliquid nemo modi cum quibusdam dolorum quidem ducimus repudiandae ipsa atque laborum veniam numquam dolor vero eveniet quod.
            </Typography>
          </Box>
          <Box>
            {!auth.user && <CardForm />}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

const SubHeading = styled.span`
  color: ${props => props.primary}
`

export default Hero