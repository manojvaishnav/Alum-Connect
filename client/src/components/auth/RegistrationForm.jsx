'use client'

import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
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
    RadioGroup,
    Radio,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../../redux/UsersSlice'

const Form1 = ({form,setForm,handleChange}) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Basic Detail
            </Heading>
            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="name" fontWeight={'normal'}>
                    Name
                </FormLabel>
                <Input id="name" type="text" name='name' onChange={handleChange} />
            </FormControl>
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
                <Input id="phone" type="phone" minLength={10} maxLength={10} name='phone' onChange={handleChange} />
            </FormControl>
            <FormControl mt="2%" isRequired>
                <FormLabel htmlFor="acc_type" fontWeight={'normal'}>
                    Account Type
                </FormLabel>
                <RadioGroup defaultValue='public' id='acc_type'>
                    <Stack spacing={5} direction='row'>
                        <Radio colorScheme='pink' value='public'>
                            Public
                        </Radio>
                        <Radio colorScheme='pink' value='private'>
                            Private
                        </Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                    Password
                </FormLabel>
                <InputGroup size="md">
                    <Input
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

const Form2 = ({handleChange}) => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                Education Detail
            </Heading>
            <FormControl as={GridItem} colSpan={[6, 3]} isRequired>
                <FormLabel
                    htmlFor="clg_name"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}>
                    College
                </FormLabel>
                <Select
                    onChange={handleChange}
                    id="clg_name"
                    name="clg_name"
                    autoComplete="college"
                    placeholder="Select college"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md">
                    <option>GECA</option>
                    <option>IITB</option>
                    <option>IIT Delhi</option>
                </Select>
            </FormControl>
            <FormControl as={GridItem} colSpan={6} isRequired>
                <FormLabel
                    htmlFor="course"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Course Name
                </FormLabel>
                <Select
                    onChange={handleChange}
                    id="course"
                    name="course"
                    autoComplete="course"
                    placeholder="Select course"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md">
                    <option>BTech</option>
                    <option>BCA</option>
                    <option>MCA</option>
                </Select>
            </FormControl>

            {/* <FormControl as={GridItem} colSpan={[6, 6, null, 2]} isRequired>
                <FormLabel
                    htmlFor="stream"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    Stream
                </FormLabel>
                <Input
                    type="text"
                    name="stream"
                    id="stream"
                    autoComplete="stream"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl> */}

            <Flex mt={'2%'}>
                <FormControl mr="5%" isRequired>
                    <FormLabel htmlFor="start_year" fontWeight={'normal'}>
                        Start from
                    </FormLabel>
                    <Input id="start_year" type='date' name='start_year' onChange={handleChange} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel htmlFor="passing_year" fontWeight={'normal'}>
                        Passing year
                    </FormLabel>
                    <Input id="passing_year" type='date' name='passing_year' onChange={handleChange} />
                </FormControl>
            </Flex>

            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                <FormLabel
                    htmlFor="clg_id"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                        color: 'gray.50',
                    }}
                    mt="2%">
                    College Id
                </FormLabel>
                <Input
                onChange={handleChange}
                    type="text"
                    name="clg_id"
                    id="clg_id"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                />
            </FormControl>
        </>
    )
}

const Form3 = ({handleChange}) => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Additional Details
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        LinkedIn
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
                            name='linkedin_url'
                            onChange={handleChange}
                            type="text"
                            placeholder="www.example.com"
                            focusBorderColor="brand.400"
                            rounded="md"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="about" mt={1}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        About/Bio
                    </FormLabel>
                    <Textarea
                        placeholder="I am a ..."
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: 'sm',
                        }}
                    />
                    <FormHelperText>
                        Brief description for your profile.
                    </FormHelperText>
                </FormControl>

            </SimpleGrid>
        </>
    )
}

export default function RegistrationForm() {
    const [step, setStep] = useState(1)
    const [progress, setProgress] = useState(33.33)

    const [form,setForm] = useState({
        name : '',email:'',phone:'',password:'',clg_name:'',course:'',clg_id:'',start_year:'',passing_year:'',linkedin_url:'',bio:''
    })

    const handleChange = (e) =>{
        
        setForm({...form,[e.target.name]:e.target.value})
        // console.log(form);
    } 

    const dispatch = useDispatch();

    const [loading,setLoading] = useState(false);

    const handleRegistration = () => {       
        setLoading(true);

        dispatch(RegisterUser(form));

        
        setForm({
            name : '',email:'',phone:'',password:'',clg_name:'',course:'',clg_id:'',start_year:'',passing_year:'',linkedin_url:'',bio:''
        })
        setLoading(false);
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
                {step === 1 ? <Form1 handleChange={handleChange} /> : step === 2 ? <Form2 handleChange={handleChange} /> : <Form3 handleChange={handleChange} />}
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
                            isLoading = {loading}
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
                                        handleRegistration()
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
                        <Link to={'/signin'}>
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