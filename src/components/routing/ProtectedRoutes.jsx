import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../../supabaseClient'
import { signOut } from '../../features/auth/authSlice'
import { resetUserProfile } from '../../features/profile/profileSlice'

const useAuth = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      
      if(!data.session) {
        dispatch(signOut())
        dispatch(resetUserProfile())

        navigate('/')
      }
    }

    checkSession();
  })

  const { user, session } = useSelector(state => state.auth)
  
  if(user && session) {
    return true
  } else {
    return false
  }
}

const ProtectedRoutes = () => {
  const auth = useAuth()

  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes