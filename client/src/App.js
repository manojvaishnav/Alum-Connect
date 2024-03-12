import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import CollegeRegister from './pages/College/CollegeRegister'
import CollegeLogin from './pages/College/CollegeLogin'
import Dashboard from './pages/College/Dashboard'
import Jobs from './pages/Jobs/Jobs'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound'
import Home from './pages/Homepage/Home'
import SideBar from './components/main/SideBar'
import Alumni from './pages/Alumni/Alumni'
import UserProfile from './pages/Profile/User/UserProfile.jsx'
import toast,{Toaster} from 'react-hot-toast'
import AdminLogin from './components/auth/AdminLogin.jsx'
import ForgotPassword from './components/auth/ForgotPassword.jsx'
import ResetPassword from './components/auth/ResetPassword.jsx'
import CreatePost from './pages/Posts/CreatePost.jsx'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/college-register' element={<CollegeRegister />} />
          <Route path='/college-login' element={<CollegeLogin />} />
          <Route path='/jobs' element={<SideBar page={<Jobs />} />} />
          <Route path='/home' element={<SideBar page={<Home />} />} />
          <Route path='/alumni' element={<SideBar page={<Alumni />} />} />
          <Route path='/profile' element={<SideBar page={<UserProfile />} />} />
          <Route path='/create-post' element={<SideBar page={< CreatePost />} />} />
          <Route path='/dashboard/college' element={<Dashboard />} />
          <Route path='/dashboard/admin' element={<Admin />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/reset-password' element={<ForgotPassword />} />
          <Route path='/new-password' element={<ResetPassword />} />          
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App