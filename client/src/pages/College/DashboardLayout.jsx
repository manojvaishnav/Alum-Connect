import React from 'react'
import { Box, Flex, Grid, SimpleGrid } from '@chakra-ui/react'
import StudentList from '../../components/college/StudentList'
import AlumniList from '../../components/college/AlumniList'
import JobList from '../../components/college/JobList'
import UnverifiedUserList from '../../components/dasboard/UnverifiedUserList'

// Data
import verifiedStudentList from '../../data/verifiedStudentList'
import verifiedAlumniList from '../../data/verifiedAlumniList';
import { useSelector } from 'react-redux'

const DashboardLayout = () => {

    const {verifiedStud,UnverifiedStud,verifiedAlumni,UnverifiedAlumni} = useSelector(state => state.clg)

    console.log('un-verify alumni ',UnverifiedAlumni)
    console.log('verify alumni ',verifiedAlumni)


    return (
        <>
            <Flex flexDirection='column' >
                <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing='24px'>
                    <StudentList verifiedStudentList={verifiedStud} />
                    <AlumniList verifiedAlumniList={verifiedAlumni} />
                    <JobList />
                </SimpleGrid>
                <Flex direction='column'>
                    <Box >
                        <Grid templateColumns={{ sm: "1fr", lg: "1.4fr 1.4fr" }} p={2} >
                            <UnverifiedUserList title={"Unverified User"} data={UnverifiedStud} />
                            <UnverifiedUserList title={"Unverified Alumni"} data={UnverifiedAlumni} />
                        </Grid>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default DashboardLayout