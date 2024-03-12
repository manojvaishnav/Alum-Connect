'use client'

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import toast from 'react-hot-toast';


export default function ForgotPassword() {
    const [form,setForm] = useState({email:''});

    const url = process.env.REACT_APP_URL;

    const [loading,setLoading] = useState(false);

    const handleForgetPassword = async()=>{
        setLoading(true);

        const res = await fetch(`${url}/api/v1/user/forgot-password`,{
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

        console.log(data);

        toast.success(data.message);

        setForm({email:''});

        setLoading(false);
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
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            name='email'
            onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleForgetPassword}
            >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}