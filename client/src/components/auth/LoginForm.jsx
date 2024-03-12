'use client'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    HStack,
    InputGroup,
    InputRightElement,
    Spinner
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser, UserLogin } from '../../redux/UsersSlice'

export default function LoginForm() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [form,setForm] = useState({email:'',password:''})

    const handleChange = (e) => setForm({...form,[e.target.name]:e.target.value});

    const dispatch = useDispatch();

    const [loading,setLoading] = useState(false);

    const handleLogin = () => {
        console.log(form)

        setLoading(true);
        console.log('call dispatch before ')
        dispatch(LoginUser(form));
        console.log('call dispatch after ')

        navigate('/profile')
        setLoading(false)
    }

    const token = localStorage.getItem('token');

    useEffect(()=>{
        if(token)
            navigate('/profile')

    },[])

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <HStack>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to connect with
                        </Text>
                        <Text color={'pink.400'}>Past ✌️</Text>
                    </HStack>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name='email' onChange={handleChange} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name='password' onChange={handleChange} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Link to={'/signup'}>Not a member?</Link>
                                <Text color={'pink.400'} cursor={'pointer'}><Link to={'/reset-password'}>Forgot Password?</Link></Text>
                            </Stack>
                            {/* <Spinner color='pink.500' /> */}
                            <Button
                                bg={'pink.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'pink.500',
                                }}
                                isLoading={loading}
                                onClick={handleLogin}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}