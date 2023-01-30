import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Button,
  MenuItem,
  Paper
} from '@mui/material'
import { useSelector } from 'react-redux';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';
import AvatarWidget from './AvatarWidget';

const select = ['Developer', 'Junior Developer', 'Senior Developer', 'Manager', 'Student', 'Other']

const EditProfileTab = () => {

  const { id: userId, user_metadata: { full_name } } = useSelector(state => state.auth.user)
  const { profile } = useSelector(state => state.profile)
  
  const [loading, setLoading] = useState(false)
  
  const { handleSubmit, register, formState: { errors }, control, reset } = useForm({ 
    defaultValues: {
      user_name: profile?.user_name || '',
      location: profile?.location || '',
      website: profile?.website || '',
      skills: profile?.skills || '',
      githubUserName: profile?.githubUserName || '',
      bio: profile?.bio || '',
      status: profile?.status || '',
      company: profile?.company || ''
    }
  })

  useEffect(() => {
    if(profile) {
      reset(profile)
    }
  }, [profile, reset])

  const onSubmit = async formData => {
    const { user_name, location, website, skills, githubUserName, bio, company, status } = formData
    
    try {
      setLoading(true)

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: userId, user_name, location, status, website, skills, githubUserName, bio, company })
        .select()

      if(error) throw error

      toast.success('Your profile was updated!', {
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
  }

  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <Typography
          variant='h5'
          marginBottom=".5rem"
        >
          Profile
        </Typography>
        <Typography
          component="h5"
          variant="subtitle2"
          lineHeight="1.2"
        >
          Here you can create or update your profile informations.
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box marginBottom="2rem">
          <Paper
            variant="outlined"
            square
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '1.4rem',
              backgroundColor: 'custom_slate.main',
              borderRadius: '5px'
            }}
          >
            <AvatarWidget 
              fullName={full_name}
              userID={userId} 
              size={80} 
              uploadButton={true}
              url={profile?.avatar_url}
            />
          </Paper>
        </Box>
        <Box>
          <Controller 
            name="user_name"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                label="Your username"
                variant="outlined"
                size="small"
                {...register('user_name', { minLength: 2 })}
                helperText={errors && errors?.position && "Field is required"}
                error={errors && errors?.position ? true : false}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              />
            )}
          />
          <Controller 
            name="location"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                label="Your location"
                variant="outlined"
                size="small"
                {...register('location')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              />
            )}
          />
          <Controller 
            name="company"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                label="Your current company"
                variant="outlined"
                size="small"
                {...register('company')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                id="outlined-select-currency"
                select
                label="Select your profession"
                variant="outlined"
                size="small"
                fullWidth
                // value={profession}
                // onChange={handleProfession}
                {...field}
                {...register('status')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              >
                {select.map((el, idx) => (
                  <MenuItem key={idx} value={el}>{el}</MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller 
            name="website"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                label="Website URL"
                fullWidth
                variant="outlined"
                size="small"
                {...register('website')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              />
            )}
          />
          <Controller 
            name="skills"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                label="Skills"
                variant="outlined"
                size="small"
                helperText="Please separate skills with comma"
                {...register('skills')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              />
            )}
          />
          <Controller 
            name="githubUserName"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                label="Your github username"
                variant="outlined"
                size="small"
                helperText="Leave empty if you don't have github account"
                {...register('githubUserName')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              />
            )}
          />
          <Controller 
            name="bio"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                multiline
                rows={6}
                label="Little description about yourself"
                variant="outlined"
                size="small"
                {...register('bio')}
                sx={{
                  marginBottom: '1rem',
                  width: '100%',
                  backgroundColor: 'custom_slate.light'
                }} 
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button 
            disabled={loading}
            size="large"
            type="submit"
            variant="contained"
            sx={{
              textTransform: 'none'
            }}>
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
    </Box>
  )
}

export default EditProfileTab