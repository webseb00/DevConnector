import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillYoutube,
  AiFillGithub
} from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useFetchUserProfileQuery, useFetchUserSocialsQuery } from '../services/supabaseApi';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const select = ['developer', 'junior developer', 'senior developer', 'manager', 'student', 'other']

const EditProfile = () => {

  const userId = useSelector(state => state.auth.user.id)

  const [userData, setUserData] = useState('')
  const [userSocialData, setUserSocialData] = useState('')

  const { data } = useFetchUserProfileQuery(userId, { refetchOnMountOrArgChange: true })
  const { data: socialData } = useFetchUserSocialsQuery(userId, { refetchOnMountOrArgChange: true })

  const [profession, setProfession] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  
  const { handleSubmit, register, formState: { errors }, control, reset } = useForm({ 
    defaultValues: {
      username: userData?.username || '',
      location: userData?.location || '',
      website: userData?.website || '',
      skills: userData?.skills || '',
      githubUserName: userData?.githubUserName || '',
      bio: userData?.bio || '',
      status: userData?.status || profession,
      company: userData?.company || '',
      youtube: userSocialData?.youtube || '',
      twitter: userSocialData?.twitter || '',
      instagram: userSocialData?.instagram || '',
      github: userSocialData?.github || '',
      linkedin: userSocialData?.linkedin || '',
    }
  })

  useEffect(() => {
    if(data?.data[0]) {
      setUserData(data?.data[0])
      setUserSocialData(socialData?.data[0])

      reset(data.data[0])
    }
  }, [data, socialData, reset])

  const handleProfession = e => setProfession(e.target.value)

  const onSubmit = async formData => {
    const { username, location, website, skills, githubUserName, bio, company, youtube, twitter, instagram, github, linkedin } = formData
    const status = profession
    
    try {
      setLoading(true)

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: userId, username, location, status, website, skills, githubUserName, bio, company })
        .select()

      const { error: errSocial } = await supabase
        .from('socials')
        .upsert({ user_id: userId, youtube, twitter, instagram, github, linkedin })
        .select()

      if(error) throw error

      if(errSocial) throw errSocial

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
        <Box>

        </Box>
        <Box>
          <Controller 
            name="username"
            control={control}
            render={({ field }) => (
              <TextField 
                { ...field }
                type="text"
                label="Your username"
                variant="filled"
                size="small"
                {...register('username', { minLength: 2 })}
                helperText={errors && errors?.position && "Field is required"}
                error={errors && errors?.position ? true : false}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%'
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
                variant="filled"
                size="small"
                {...register('location')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%'
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
                variant="filled"
                size="small"
                {...register('company')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%'
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
                variant="filled"
                size="small"
                fullWidth
                value={profession}
                onChange={handleProfession}
                {...field}
                {...register('status')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%'
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
                variant="filled"
                size="small"
                {...register('website')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%'
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
                variant="filled"
                size="small"
                helperText="Please separate skills with comma"
                {...register('skills')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%'
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
                variant="filled"
                size="small"
                helperText="Leave empty if you don't have github account"
                {...register('githubUserName')}
                sx={{
                  marginBottom: '.7rem',
                  width: '100%'
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
                variant="filled"
                size="small"
                {...register('bio')}
                sx={{
                  marginBottom: '1rem',
                  width: '100%'
                }} 
              />
            )}
          />
          <Box>
            <Button
              variant="outlined"
              color="info"
              onClick={() => setOpen(prev => !prev)}
              sx={{ marginBottom: '.7rem' }}
            >
              Add Social Network Links
            </Button>
            {open && (
              <Box sx={{ marginTop: '1rem' }}>
                <Controller 
                  name="linkedin"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      { ...field }
                      { ...register('linkedin') }
                      type="text"
                      variant="outlined"
                      size="small"
                      id="input-with-icon-textfield"
                      label="LinkedIn"
                      fullWidth
                      sx={{ marginBottom: '.7rem' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiFillLinkedin style={{ fontSize: '2rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller 
                  name="twitter"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      { ...field }
                      {...register('twitter')}
                      type="text"
                      variant="outlined"
                      size="small"
                      id="input-with-icon-textfield"
                      label="Twitter"
                      fullWidth
                      sx={{ marginBottom: '.7rem' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiFillTwitterSquare style={{ fontSize: '2rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller 
                  name="instagram"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      {...register('instagram')}
                      type="text"
                      variant="outlined"
                      size="small"
                      id="input-with-icon-textfield"
                      label="Instagram"
                      fullWidth
                      sx={{ marginBottom: '.7rem' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiFillInstagram style={{ fontSize: '2rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller 
                  name="youtube"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      {...register('youtube')}
                      type="text"
                      variant="outlined"
                      size="small"
                      id="input-with-icon-textfield"
                      label="YouTube"
                      fullWidth
                      sx={{ marginBottom: '.7rem' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiFillYoutube style={{ fontSize: '2rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller 
                  name="github"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      {...register('github')}
                      type="text"
                      variant="outlined"
                      size="small"
                      id="input-with-icon-textfield"
                      label="Github"
                      fullWidth
                      sx={{ marginBottom: '.7rem' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiFillGithub style={{ fontSize: '2rem' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            )}
          </Box>
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
    </Box>
  )
}

export default EditProfile