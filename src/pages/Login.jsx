import React, { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@mui/material'
import SignInBG from '../assets/signin_bg.jpg'
import { toast } from 'react-toastify';

import { useForm, Controller } from 'react-hook-form'
import { supabase } from '../supabaseClient'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../features/auth/authSlice';

const Login = () => {

  const { user, session } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const { register, formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async formData => {
    try {
      setLoading(true)

      const { email, password } = formData
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if(error) throw error

      dispatch(signIn(data))

      navigate('/dashboard')

    } catch(error) {

      toast.error('Invalid login credentials, please try again.', {
        position: 'bottom-center',
        theme: 'colored',
        hideProgressBar: true
      })
    } finally { 
      setLoading(false)
    }
  }

  if(user && session) return <Navigate to="/dashboard" />

  return (
    <Box
      component="div"
      sx={{
        height: '90vh',
        padding: '2rem 0',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${SignInBG}) `,
        backgroundPosition:"center",
        backgroundSize:"cover"
      }}
    >
      <Container maxWidth="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              background: 'white',
              padding: {
                xs: '1rem 1rem 1.4rem 1rem',
                md: '1rem 2rem 1.4rem 2rem'
              },
              borderRadius: '5px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '380px',
              width: '100%'
            }}
          >
            <Typography
              variant="h6"
              textAlign="center"
              marginBottom="1rem"
            >
              Sign In
            </Typography>
            <Box
              component="div"
            >
              <Controller 
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField 
                    { ...field }
                    type="email" 
                    label="Email" 
                    variant="outlined"
                    size="small"
                    {...register('email', { required: true, minLength: 3 })}
                    helperText={errors && errors?.email && "Field can not be empty"}
                    error={errors && errors?.email ? true : false}
                    sx={{
                      marginBottom: '.7rem',
                      width: '100%'
                    }} 
                  />
                )}
              />
              <Controller 
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField 
                    { ...field }
                    type="password"
                    label="Password" 
                    variant="outlined"
                    size="small"
                    {...register('password', { required: true, minLength: 5 })}
                    helperText={errors && errors?.password && "Field can not be empty"}
                    error={errors && errors?.password ? true : false}
                    sx={{
                      marginBottom: '.7rem',
                      width: '100%'
                    }} 
                  />
                )}
              />
            </Box>
            <Box
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem'
              }}
            >
              <Button 
                disabled={loading}
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  textTransform: 'none'
                }}
              >
                {
                  !loading ? 'Submit' : 
                  <>
                    <CircularProgress sx={{ color: 'white', marginRight: '6px' }} size={20} />
                    <p>Loading...</p>
                  </>
                }
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  )
}

export default Login