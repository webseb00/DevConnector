import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload
    },
    resetUserProfile: state => {
      state.profile = null
    }
  }
})

export const { setUserProfile, resetUserProfile } = profileSlice.actions

export default profileSlice.reducer