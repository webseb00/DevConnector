import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Button,
  InputAdornment,
} from '@mui/material'
import {
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillYoutube,
  AiFillGithub
} from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useFetchUserSocialsQuery } from '../services/supabaseApi';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const SocialsTab = () => {

  const [loading, setLoading] = useState(false)

  const { id: userId } = useSelector(state => state.auth.user)
  const { data: socialData } = useFetchUserSocialsQuery(userId, { refetchOnMountOrArgChange: true })

  const { handleSubmit, register, formState: { errors }, control, reset } = useForm({ 
    defaultValues: {
      youtube: socialData?.data[0].youtube || '',
      twitter: socialData?.data[0].twitter || '',
      instagram: socialData?.data[0].instagram || '',
      github: socialData?.data[0].github || '',
      linkedin: socialData?.data[0].linkedin || '',
    }
  })

  const onSubmit = async formData => {
    const { youtube, twitter, instagram, github, linkedin } = formData

    try {
      setLoading(true)

      const { error } = await supabase
      .from('socials')
      .upsert({ user_id: userId, youtube, twitter, instagram, github, linkedin })
      .select()

      if(error) throw error

      toast.success('Your links were updated!', {
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

  useEffect(() => { 
    if(socialData?.data[0]) {
      reset(socialData.data[0])
    }
  }, [socialData, reset])

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Box
        textAlign="center"
        marginBottom="2rem"
      >
        <Typography
            variant='h5'
            marginBottom=".2rem"
          >
            Socials
          </Typography>
          <Typography
            component="h5"
            variant="subtitle2"
          >
            Here you can manage your other social media links.
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller 
          name="linkedin"
          control={control}
          render={({ field }) => (
            <TextField
              { ...field }
              { ...register('linkedin', {
                minLength: 10,
                message: 'Your link is to short' 
              }, {
                pattern: /^(http|https):\/\//,
                message: 'Url must start with http:// or https://'
              }) }
              type="text"
              variant="outlined"
              size="small"
              id="input-with-icon-textfield"
              label="LinkedIn"
              fullWidth
              sx={{ marginBottom: '.7rem', backgroundColor: 'custom_slate.light' }}
              helperText={errors && errors?.linkedin && errors.linkedin.message}
              error={errors && errors?.linkedin ? true : false}
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
              { ...register('twitter', {
                minLength: 10,
                message: 'Your link is to short' 
              }, {
                pattern: /^(http|https):\/\//,
                message: 'Url must start with http:// or https://'
              }) }
              type="text"
              variant="outlined"
              size="small"
              id="input-with-icon-textfield"
              label="Twitter"
              fullWidth
              sx={{ marginBottom: '.7rem', backgroundColor: 'custom_slate.light' }}
              helperText={errors && errors?.twitter && errors.twitter.message}
              error={errors && errors?.twitter ? true : false}
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
              { ...register('instagram', {
                minLength: 10,
                message: 'Your link is to short' 
              }, {
                pattern: /^(http|https):\/\//,
                message: 'Url must start with http:// or https://'
              }) }
              type="text"
              variant="outlined"
              size="small"
              id="input-with-icon-textfield"
              label="Instagram"
              fullWidth
              sx={{ marginBottom: '.7rem', backgroundColor: 'custom_slate.light' }}
              helperText={errors && errors?.instagram && errors.instagram.message}
              error={errors && errors?.instagram ? true : false}
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
              { ...register('youtube', {
                required: true,
                minLength: {
                  value: 10,
                  message: 'Url is too short'
                },
                pattern: {
                  value: /^(http|https):\/\//,
                  message: 'Url must start with http:// or https://'
                },
              }) }
              type="text"
              variant="outlined"
              size="small"
              id="input-with-icon-textfield"
              label="YouTube"
              fullWidth
              sx={{ marginBottom: '.7rem', backgroundColor: 'custom_slate.light' }}
              helperText={errors && errors?.youtube && errors.youtube.message}
              error={errors && errors?.youtube ? true : false}
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
              { ...register('github', {
                required: true,
                minLength: {
                  value: 10,
                  message: 'Url is too short'
                },
                pattern: {
                  value: /^(http|https):\/\//,
                  message: 'Url must start with http:// or https://'
                },
              }) }
              type="text"
              variant="outlined"
              size="small"
              id="input-with-icon-textfield"
              label="Github"
              fullWidth
              sx={{ marginBottom: '.7rem', backgroundColor: 'custom_slate.light' }}
              helperText={errors && errors?.github && errors.github.message}
              error={errors && errors?.github ? true : false}
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

export default SocialsTab