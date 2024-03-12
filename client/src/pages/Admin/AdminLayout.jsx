import React, { useEffect } from 'react'
import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react'
import StudentList from '../../components/college/StudentList'
import AlumniList from '../../components/college/AlumniList'
import JobList from '../../components/college/JobList'
import UnverifiedCollegeList from '../../components/dasboard/UnverifiedCollegeList'
import Navbar2 from '../../components/main/Navbar2'
import Footer from '../../components/main/Footer'

// Data
import verifiedStudentList from '../../data/verifiedStudentList'
import verifiedAlumniList from '../../data/verifiedAlumniList';
import unverifiedCollegeList from '../../data/unverifiedCollegeList'
import CollegeList from '../../components/admin/CollegeList'
import { useDispatch } from 'react-redux'
import { GetAllPostedJobsList, GetUnverifiedCollegeList, GetVerifiedAlumniList, GetVerifiedCollegeList, GetVerifiedStudentList } from '../../redux/AdminSlice'
import { token } from '../../utils/GlobalFunctions'
import { useNavigate } from 'react-router-dom'
import AdminNavbar from '../../components/main/AdminNavbar'

const AdminLayout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(token){

            dispatch(GetVerifiedCollegeList());
            
            dispatch(GetUnverifiedCollegeList());

            dispatch(GetVerifiedAlumniList());

            dispatch(GetVerifiedStudentList());

            dispatch(GetAllPostedJobsList());
        }

        else 
            navigate('/admin/login');
    },[dispatch])

    


    return (
        <>
            <AdminNavbar/>
            <Box pt={4} p={2} w={'full'} bg={'gray.100'}>
                <Flex flexDirection='column' >
                    <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing='24px'>
                        <StudentList verifiedStudentList={verifiedStudentList} />
                        <AlumniList verifiedAlumniList={verifiedAlumniList} />
                        <CollegeList verifiedCollegeList={verifiedAlumniList} />
                        <JobList />
                    </SimpleGrid>
                    <Flex direction='column'>
                        <Box >
                            <Grid templateColumns={{ sm: "1fr", lg: "1.4fr 1.4fr" }} p={2} >
                                <UnverifiedCollegeList title={"Unverified College"} data={unverifiedCollegeList} />
                            </Grid>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <Footer />
        </>
    )
}

export default AdminLayout