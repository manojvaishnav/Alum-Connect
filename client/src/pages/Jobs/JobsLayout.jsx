import React from 'react'
import JobCard from './components/JobCard'
import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const JobsLayout = ({ jobDetail }) => {

  const posts = useSelector(state => state.users.posts);

  console.log('posts',posts);

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, md: 7, lg: 8 }}>
        {posts?.length <=0 && <h5>No posts yet!</h5> }
        {
          posts?.map((detail, i) => {
            return <GridItem cursor={'pointer'} key={i}>
              <JobCard detail={detail}  />
            </GridItem>
          })
        }
      </SimpleGrid>
    </>
  )
}

export default JobsLayout