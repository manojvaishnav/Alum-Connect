'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

export default function ResetPassword() {

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');


  const [newPassword,setNewPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const url = process.env.REACT_APP_URL;

  const handleResetPassword = async()=>{
    setLoading(true);

    const form = {token,newPassword};

    const res = await fetch(`${url}/api/v1/user/reset-password`,{
        method:'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(form)
    })

    const data = await res.json();

    if(data?.success === false){
        toast.error(data?.message);
        setLoading(false);
        return;
    }


    toast.success(data.message);

    setLoading(false);

    setNewPassword('');
}

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
       
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name='password' onChange={(e)=>setNewPassword(e.target.value)} />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500'
            }}
              onClick = {handleResetPassword}
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}