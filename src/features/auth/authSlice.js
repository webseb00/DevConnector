import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  session: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { user, session } = action.payload

      state.user = user
      state.session = session
    },
    signOut: state => {
      state.user = null
      state.session = null
    }
  }
})

export const { signIn, signOut } = authSlice.actions

export default authSlice.reducer