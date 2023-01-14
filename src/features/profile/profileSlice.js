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
    }
  }
})

export const { setUserProfile } = profileSlice.actions

export default profileSlice.reducer