import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useAuth = () => {
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