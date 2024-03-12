import React, { useEffect } from 'react'
import ProfileCard from './ProfileCard'
import { SimpleGrid } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { token } from '../../utils/GlobalFunctions'
import { FetchAllClgAlumnis, Profile } from '../../redux/UsersSlice'

const Alumni = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    if(token){
      // dispatch(Profile());
      dispatch(FetchAllClgAlumnis());
    }  
  },[])

  const alumnis = useSelector(state => state.users.alumnis)

  console.log('alumnis ',alumnis)

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm:1, md: 2, lg:2, xl:3 }} spacing={{ base: 5, md: 7, lg: 8 }}>
        {alumnis?.length <=0 && <h5>No alumins yet!</h5>}
        {
          alumnis?.map((alu,i)=>{

          return  <ProfileCard alumnis={alu} key={i}  />
          })
        }
        {/* <ProfileCard />
        <ProfileCard /> */}
      </SimpleGrid>
    </>
  )
}

export default Alumni