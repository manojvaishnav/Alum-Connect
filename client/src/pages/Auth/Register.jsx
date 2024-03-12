import React from 'react'
import Navbar from '../../components/main/Navbar'
import RegistrationForm from '../../components/auth/RegistrationForm'
import Footer from '../../components/main/Footer'
import { HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'

const Register = () => {
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
            <Text color={'pink.400'}>Past ✌️</Text>
          </HStack>
        </Stack>
        <RegistrationForm />
      </VStack>
      <Footer />
    </>
  )
}

export default Register