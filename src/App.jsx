import { useEffect } from 'react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'

import {
  Home,
  Login,
  Dashboard,
  Profile,
  Developers,
  Posts,
  Comments
} from './pages'
import AddPostWrapper from './components/AddPostWrapper'
import ProtectedRoutes from './components/routing/ProtectedRoutes'

import { useSelector, useDispatch } from 'react-redux'
import { useFetchUserProfileQuery } from './services/supabaseApi'
import { setUserProfile } from './features/profile/profileSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { skipToken } from '@reduxjs/toolkit/query/react'

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const { data, isLoading } = useFetchUserProfileQuery(auth.user ? auth.user.id : skipToken )

  useEffect(() => {
    if(data && data.data) {
      dispatch(setUserProfile(data.data[0]))
    }
  }, [isLoading])

  return (
    <>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/posts" element={<AddPostWrapper component={<Posts />} />} />
            <Route path="/comments/:id" element={<Comments />} />
          </Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
