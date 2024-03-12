import React, { useEffect } from 'react'
import Navbar2 from '../../components/main/Navbar2'
import Footer from '../../components/main/Footer'
import { Box } from '@chakra-ui/react'
import DashboardLayout from './DashboardLayout'
import { token } from '../../utils/GlobalFunctions'
import { useDispatch } from 'react-redux'
import { GetAllClgAlumniList, GetAllClgAlumniVerifiedList, GetAllClgStudentList, GetAllClgStudentVerifiedList, ProfileClg } from '../../redux/ClgSlice'

const Dashboard = () => {
  const dispatch = useDispatch();


  useEffect(()=>{
    if(token){
      dispatch(ProfileClg())
      dispatch(GetAllClgAlumniList())
      dispatch(GetAllClgAlumniVerifiedList());
      dispatch(GetAllClgStudentList())
      dispatch(GetAllClgStudentVerifiedList());
    }
  },[])

  return (
    <>
      <Navbar2 />
      <Box pt={4} p={2} w={'full'} bg={'gray.100'}>
        <DashboardLayout />
      </Box>
      <Footer />
    </>
  )
}

export default Dashboard