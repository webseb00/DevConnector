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

import moment from 'moment/moment.js';

import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useAddEducationItemMutation } from '../services/supabaseApi';

import ListIcon from '@mui/icons-material/List';
import { EducationList, DashboardModal } from './'

const EducationTab = () => {
  const [addEducationItem] = useAddEducationItemMutation()

  const userID = useSelector(state => state.auth.user.id)

  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, formState, formState: { errors, isSubmitSuccessful }, control, watch, reset } = useForm({
    defaultValues: {
      school: '',
      degree: '',
      fieldOfStudy: '',
      from_date: '',
      to_date: '',
      current_edu: false,
      description: ''
    }
  })
 
  const watchFields = watch(['to_date', 'current_edu', 'from_date']);
  const dateErrorMsg = <p><b>To Date</b> can not be lower than <b>From Date</b></p>

  const onSubmit = async formData => {
    try {
      setLoading(true)
      const { school, degree, fieldOfStudy, from_date, to_date, current_edu, description  } = formData

      const { error } = await addEducationItem({
        school,
        degree, 
        fieldOfStudy, 
        from: from_date,
        to: !to_date ? null : to_date,
        current: current_edu,
        description,
        user_id: userID
      })

      if(error) throw error

      toast.success('Your education has been added!', {
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
        school: '',
        degree: '',
        fieldOfStudy: '',
        from_date: '',
        to_date: '',
        current_edu: false,
        description: ''
      })
    }
  }, [formState, reset])

  return (
    <Box>
      {modal && <DashboardModal
                  modal={modal}
                  setModal={setModal}
                  title="Education List"
                  component={<EducationList userId={userID} />} 
                 />}
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
          Add Education
        </Typography>
        <Typography
          component="h5"
          variant="subtitle2"
          lineHeight="1.2"
        >
          Add any school or bootcamp that you <br/>
          have attended
        </Typography>
      </Box>
      <Box
        sx={{
          margin: '2rem 0'
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ListIcon />}
          onClick={() => setModal(true)}
        >
          Education List
        </Button>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller 
          name="school"
          control={control}
          render={({ field }) => (
            <TextField 
              { ...field }
              type="text"
              label="School name"
              variant="outlined"
              size="small"
              {...register('school', { required: true, minLength: 5 })}
              helperText={errors && errors?.school && "Field is required"}
              error={errors && errors?.school ? true : false}
              sx={{
                marginBottom: '.7rem',
                width: '100%', 
                backgroundColor: 'custom_slate.light'
              }} 
            />
          )}
        />
        <Controller 
          name="degree"
          control={control}
          render={({ field }) => (
            <TextField 
              { ...field }
              type="text"
              label="Degree"
              variant="outlined"
              size="small"
              {...register('degree', { required: true, minLength: 3 })}
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
          name="fieldOfStudy"
          control={control}
          render={({ field }) => (
            <TextField 
              { ...field }
              type="text"
              label="Field of study"
              variant="outlined"
              size="small"
              {...register('fieldOfStudy', { required: true, minLength: 3 })}
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
                name="current_edu"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    sx={{ marginBottom: '.7rem' }} 
                  />
                )}
              />
            }
            label="Current"
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
              label="Field description"
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

export default EducationTab