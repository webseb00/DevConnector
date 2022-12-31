import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardActions, 
  CardContent, 
  TextField, 
  Button, 
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const CardForm = () => {

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState, formState: { errors, isSubmitSuccessful }, control, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_repeat: '',
      terms_checkbox: false
    }
  });

  const onSubmit = async formData => {
    try {
      setLoading(true)
      const { first_name, last_name, email, password } = formData
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${first_name} ${last_name}`
          }
        }
      })

      if(error) throw error

      toast.success('Your account has been created, now you can sign in!', {
        position: 'bottom-center',
        theme: 'colored',
        hideProgressBar: true
      })

    } catch(error) {
      toast.error(error.error_description || error.message, {
        position: 'bottom-center',
        theme: 'colored',
        hideProgressBar: true
      })
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_repeat: '',
        terms_checkbox: false
      })
    }
  }, [formState, reset])

  return (
    <Box component="div">
      <Card
        sx={{ 
          minWidth: 275,
          maxWidth: 340 ,
          padding: '1rem',
          borderRadius: '5px'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            component="div"
            marginBottom=".4rem"
          >
            <Typography
              variant="h5"
              textAlign="center"
              lineHeight="90%"
              marginBottom=".5rem"
              color="primary"
            >
              Sign Up
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              lineHeight="1"
            >
              And become the member of the<br /> 
              largest IT community in the world!
            </Typography>
          </Box>
          <CardContent>
            <Controller 
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextField 
                  { ...field }
                  type="text" 
                  label="First Name" 
                  variant="outlined"
                  size="small"
                  {...register('first_name', { required: true, minLength: 3 })}
                  helperText={errors && errors?.first_name && "Field can not be empty"}
                  error={errors && errors?.first_name ? true : false}
                  sx={{
                    marginBottom: '.7rem',
                    width: '100%'
                  }} 
                />
              )}
            />
            <Controller 
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextField 
                  { ...field }
                  type="text" 
                  label="Last Name" 
                  variant="outlined"
                  size="small"
                  {...register('last_name', { required: true, minLength: 3 })}
                  helperText={errors && errors?.last_name && "Field can not be empty"}
                  error={errors && errors?.last_name ? true : false}
                  sx={{
                    marginBottom: '.7rem',
                    width: '100%'
                  }} 
                />
              )}
            />
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
                  {...register('email', { required: true, minLength: 5 })}
                  helperText={errors && errors?.email && "Example: yourmail@mail.com"}
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
            <Controller 
              name="password_repeat"
              control={control}
              render={({ field }) => (
                <TextField 
                  { ...field }
                  type="password" 
                  label="Repeat password" 
                  variant="outlined"
                  size="small"
                  {...register('password_repeat', { 
                    required: true, 
                    validate: (value) => {
                      if(watch('password') !== value) return 'Passwords must be the same'
                    }
                  })}
                  helperText={errors && errors?.password_repeat?.message}
                  error={errors && errors?.password_repeat ? true : false}
                  sx={{
                    width: '100%'
                  }} 
                />
              )}
            />
          </CardContent>
          <CardActions
            sx={{
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <FormControl error={errors && errors?.terms_checkbox ? true : false}>
              <Controller 
                name="terms_checkbox"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel 
                    control={<Checkbox />}
                    error={'true'}
                    { ...field }
                    label={
                      <Box
                        component="div"
                        sx={{
                          fontSize: '.8rem',
                          margin: '0 auto'
                        }}
                      >
                        Accept <Link component={RouterLink} to="/" color="primary">Terms and Conditions</Link> to sign up.
                        {
                          errors && errors?.terms_checkbox && 
                          <FormHelperText
                            sx={{
                              marginTop: '0',
                              marginLeft: '0'
                            }}
                          >
                            Please accept terms and conditions
                          </FormHelperText>
                        }
                      </Box>
                    } 
                  />
                )}
              /> 
            </FormControl>
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
                !loading ? 'Sign Up' : 
                <>
                  <CircularProgress sx={{ color: 'white', marginRight: '6px' }} size={20} />
                  <p>Loading...</p>
                </>
              }
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  )
}

export default CardForm