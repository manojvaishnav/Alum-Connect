import React from 'react'
import Navbar from '../../components/main/Navbar'
import Footer from '../../components/main/Footer'
import CollegeRegistrationForm from '../../components/auth/CollegeRegistrationForm'
import { HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CollegeRegister = () => {


  return (
    <>
      <Navbar />
      <VStack mt={10}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>Sign up to your account</Heading>
          <HStack>
            <Text fontSize={'lg'} color={'gray.600'}>
              to connect with
            </Text>
            <Text color={'pink.400'}>Past and Future✌️</Text>
          </HStack>
        </Stack>
        <CollegeRegistrationForm />
      </VStack>
      <Footer />
    </>
  )
}

export default CollegeRegister