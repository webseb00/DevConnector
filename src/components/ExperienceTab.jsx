import React, { useState, useEffect } from 'react'
import { 
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  CircularProgress,
  Button
} from '@mui/material'
import { useForm, Controller } from "react-hook-form";
import moment from 'moment/moment.js';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ExperienceTab = () => {
 
  const userID = useSelector(state => state.auth.user.id)
  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, formState, formState: { errors, isSubmitSuccessful }, control, watch, reset } = useForm({
    defaultValues: {
      position: '',
      company: '',
      location: '',
      from_date: '',
      to_date: '',
      current_job: false,
      description: ''
    }
  })
 
  const watchFields = watch(['to_date', 'current_job', 'from_date']);
  const dateErrorMsg = <p><b>To Date</b> can not be lower than <b>From Date</b></p>

  const onSubmit = async formData => {
    try {
      setLoading(true)
      const { position, company, location, from_date, to_date, current_job, description } = formData

      const { error } = await supabase.from('experience').insert({
        title: position,
        company, 
        location, 
        from: from_date,
        to: to_date,
        current: current_job,
        description,
        user_id: userID
      }, { returning: 'minimal' })

      if(error) throw error

      toast.success('Your experience has been added!', {
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
    if(isSubmitSuccessful) {
      reset({
        position: '',
        company: '',
        location: '',
        from_date: '',
        to_date: '',
        current_job: false,
        description: ''
      })
    }
  }, [formState, reset])

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
          Add Experience
        </Typography>
        <Typography
          component="h5"
          variant="subtitle2"
          lineHeight="1.2"
        >
          Add any job or position you have<br />
          had in the past.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller 
          name="position"
          control={control}
          render={({ field }) => (
            <TextField 
              { ...field }
              type="text"
              label="Position"
              variant="outlined"
              size="small"
              {...register('position', { required: true, minLength: 5 })}
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
          name="company"
          control={control}
          render={({ field }) => (
            <TextField 
              { ...field }
              type="text"
              label="Company"
              variant="outlined"
              size="small"
              {...register('company', { required: true, minLength: 3 })}
              helperText={errors && errors?.company && "Field is required"}
              error={errors && errors?.company ? true : false}
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
              label="Location"
              variant="outlined"
              size="small"
              {...register('location', { required: true, minLength: 3 })}
              helperText={errors && errors?.location && "Field is required"}
              error={errors && errors?.location ? true : false}
              sx={{
                marginBottom: '.7rem',
                width: '100%',
                backgroundColor: 'custom_slate.light'
              }} 
            />
          )}
        />
        <Controller 
          name="from_date"
          control={control}
          render={({ field }) => (
            <>
              <Typography sx={{ marginLeft: '2px' }}>From date</Typography>
              <Input
                fullWidth
                size="small"
                type="date" 
                { ...field } 
                sx={{ display: 'block', marginBottom: '.7rem' }} 
                {...register('from_date', { required: true })}
                error={errors && errors?.from_date ? true : false}
              />
            </>
          )}
        />
        {!watchFields[1] && (
          <Controller 
            name="to_date"
            control={control}
            render={({ field }) => (
              <>
                <Typography sx={{ marginLeft: '2px' }}>To date</Typography>
                <Input
                  fullWidth
                  size="small"
                  type="date" 
                  { ...field } 
                  sx={{ display: 'block', marginBottom: '.7rem' }} 
                  {...register('to_date', {
                    validate: {
                      checkIfLower: v => moment(v).isAfter(watchFields[2]) || dateErrorMsg
                    }
                  })}
                  error={errors && errors?.to_date ? true : false}
                />
                {errors && errors?.to_date ? 
                  <InputLabel sx={{ marginBottom: '.7rem', fontSize: '14px' }} error={true}>
                    {errors.to_date.message}
                  </InputLabel> : ''}
              </>
            )}
          />
        )}
        {!watchFields[0] && (
          <FormControlLabel
            control={
              <Controller
                name="current_job"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    sx={{ marginBottom: '.7rem' }} 
                  />
                )}
              />
            }
            label="Current job"
          />
        )}
        <Controller 
          name="description"
          control={control}
          render={({ field }) => (
            <TextField 
              { ...field }
              id="outlined-multiline-static"
              rows={5}
              multiline
              fullWidth
              variant="outlined"
              label="Job description"
              sx={{
                marginBottom: '1rem',
                display: 'block',
                backgroundColor: 'custom_slate.light'
              }}
              {...register('description')}
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
      </form>
    </Box>
  )
}

export default ExperienceTab