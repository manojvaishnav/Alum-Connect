'use client'

import { useState } from 'react'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    Stack,
    HStack,
    Text,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RegisterClg } from '../../redux/ClgSlice'

const Form1 = ({handleChange,handleFile}) => {

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Basic Detail
            </Heading>
            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="name" fontWeight={'normal'}>
                    College Name
                </FormLabel>
                <Input id="name" type="text" name='name' onChange={handleChange} />
            </FormControl>

            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="institute" fontWeight={'normal'}>
                    Institute Type
                </FormLabel>
                <Select
                    id="institute"
                    name="institute_type"
                    onChange={handleChange}
                    autoComplete="institute"
                    placeholder="Select type"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md">
                    <option>university</option>
                    <option>college</option>
                </Select>
            </FormControl >

            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="logo" fontWeight={'normal'}>
                    College logo
                </FormLabel>
                <Input id="logo" type="file" name='file' onChange={handleFile} />
            </FormControl>

            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="inst_code" fontWeight={'normal'}>
                    Institute Code
                </FormLabel>
                <Input id="inst_code" type="text" name="institute_code" onChange={handleChange} />
            </FormControl>

        </>
    )
}

const Form2 = ({handleChange}) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Contact Detail
            </Heading>

            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="email" fontWeight={'normal'}>
                    Email
                </FormLabel>
                <Input id="email" type="email" name='email' onChange={handleChange} />
            </FormControl >

            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="number" fontWeight={'normal'}>
                    Phone
                </FormLabel>
                <Input id="number" type="number" name='phone' onChange={handleChange} minLength={10} maxLength={10} />
            </FormControl>

            <FormControl mt={'2%'} colSpan={6} isRequired>
                <FormLabel
                    htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Address
                </FormLabel>
                <Input id="street_address" type="text" name='address' onChange={handleChange} />
            </FormControl>

            <FormControl colSpan={6} mt={'2%'}>
                <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    Website
                </FormLabel>
                <InputGroup size="sm">
                    <InputLeftAddon
                        bg="gray.50"
                        _dark={{
                            bg: 'gray.800',
                        }}
                        color="gray.500"
                        rounded="md">
                        http://
                    </InputLeftAddon>
                    <Input
                        type="text"
                        name='website_link'
                        onChange={handleChange}
                        placeholder="www.example.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                    />
                </InputGroup>
            </FormControl>

            <FormControl isRequired>
                <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                    Password
                </FormLabel>
                <InputGroup size="md">
                    <Input
                        id='password'
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                        name='password'
                        onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </>
    )
}

const Form3 = ({handleChange}) => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Course Details
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <FormControl id="about" mt={1} isRequired>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Courses
                    </FormLabel>
                    <Textarea
                        placeholder="BTech, BCA, MCA,...."
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: 'sm',
                        }}
                    />
                    <FormHelperText>
                        Seprate courses with , coma.
                    </FormHelperText>
                </FormControl>

            </SimpleGrid>
        </>
    )
}

export default function CollegeRegistrationForm() {
    const toast = useToast()
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(33.33)


    const [form, setForm] = useState({
        name:'',email:'',password:'',phone:'',website_link:'',institute_code:'',institute_type:'',address:'',courses:[]
    });

    const [file,setFile] = useState(null);

    const handleFile = (e) => setFile(e.target.files[0])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleClgRegister = () => {

        console.log(form);
        console.log(file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name',form.name);
        formData.append('email',form.email);
        formData.append('password',form.password);
        formData.append('phone',form.phone);
        formData.append('institute_type',form.institute_type);
        formData.append('institute_code',form.institute_code);
        formData.append('website_link',form.website_link);
        formData.append('address',form.address);
        formData.append('courses',form.courses);

        dispatch(RegisterClg(formData));
    
    }

    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                w={['300px', '400px', '600px', '700px']}
                p={6}
                m="10px auto"
                as="form">
                <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated colorScheme='pink'></Progress>
                {step === 1 ? <Form1 handleChange={handleChange} handleFile={handleFile} /> : step === 2 ? <Form2 handleChange={handleChange} /> : <Form3 handleChange={handleChange} />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1)
                                    setProgress(progress - 33.33)
                                }}
                                isDisabled={step === 1}
                                colorScheme="pink"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                onClick={() => {
                                    if (step !== 3) {
                                        setStep(step + 1)
                                        if (step === 3) {
                                            setProgress(100)
                                        } else {
                                            setProgress(progress + 33.33)
                                        }
                                    }
                                    else {
                                        handleClgRegister()
                                    }
                                }}
                                colorScheme="pink"
                                variant="outline">
                                {step === 3 ? "Submit" : "Next"}
                            </Button>
                        </Flex>
                    </Flex>
                </ButtonGroup>
                <Stack spacing={10} mt={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Link to={'/college-login'}>
                            <HStack>
                                <Text fontSize={'md'} color={'gray.600'}>
                                    Already a member?
                                </Text>
                                <Text fontSize={'md'} color={'pink.400'}>Login</Text>
                            </HStack>
                        </Link>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}