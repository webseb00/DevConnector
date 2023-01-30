import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  CircularProgress
} from '@mui/material'

import { useForm, Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAddPostMutation } from '../services/supabaseApi';

const PostForm = () => {

  const userId = useSelector((state) => state.auth.user.id)
  const [addPost] = useAddPostMutation()

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState, formState: { errors }, control } = useForm()

  const onSubmit = async data => {
    console.log(data)
    try {
      setLoading(true)
      const { error } = await addPost({ user_id: userId, text: data.text })

      if(error) throw error

      toast.success('Your post was added!', {
        position: 'bottom-center',
        theme: 'colored',
        hideProgressBar: true
      })
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%'}}
    >
      <Controller 
        name="text"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field}
            type="text"
            label="Create post"
            variant="outlined"
            size="small"
            multiline
            rows={6}
            {...register('text', { 
              required: {
                message: 'Field cannot be empty',
                value: true
              }, 
              minLength: {
                message: 'Content must contain at least 30 characters',
                value: 30,
              },
            })}
            helperText={errors && errors.text?.message}
            error={errors && errors?.text ? true : false}
            sx={{
              width: '100%',
              margin: '1rem 0'
            }}
          />
        )}
      />
      <Box textAlign="center">
        <Button 
          disabled={loading}
          size="large"
          type="submit"
          variant="contained"
          sx={{
            textTransform: 'none',
            textAlign: 'center'
          }}
        >
          {
            !loading ? 'Add Post' : 
            <>
              <CircularProgress sx={{ color: 'white', marginRight: '6px' }} size={20} />
              <p>Loading...</p>
            </>
          }
        </Button>
      </Box>
    </Box>
  )
}

export default PostForm