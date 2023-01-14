import { useEffect } from 'react'
import Layout from './components/Layout'
import { Routes, Route, useNavigate } from 'react-router-dom'

import {
  Home,
  Login,
  Dashboard,
  CreateProfile,
  Profile
} from './pages'

import ProtectedRoutes from './components/routing/ProtectedRoutes'

import { useSelector, useDispatch } from 'react-redux'
import { useFetchUserProfileQuery } from './services/supabaseApi'
import { setUserProfile } from './features/profile/profileSlice'
import { signOut } from './features/auth/authSlice'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useJwt } from 'react-jwt'

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const { decodedToken, isExpired } = useJwt(auth?.session?.access__token);

  const { data, isLoading } = useFetchUserProfileQuery(auth.user.id)

  useEffect(() => {
    console.log(isLoading)
    if(data && data.data[0]) {
      dispatch(setUserProfile(data.data[0]))
    }
  }, [isLoading])

  useEffect(() => {
    console.log(isExpired)
    if(auth?.session?.access__token && isExpired) {
      dispatch(signOut())
      navigate('/')
    }
  }, [auth])

  return (
    <>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
