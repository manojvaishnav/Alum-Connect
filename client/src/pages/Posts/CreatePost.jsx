
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Select,
    Textarea,
    Center,
} from '@chakra-ui/react'
import { useState } from 'react'
import { token } from '../../utils/GlobalFunctions';
import toast from 'react-hot-toast';

export default function CreatePost() {

    const url = process.env.REACT_APP_URL;

    const [loading,setLoading] = useState(false);
    const [form,setForm] = useState({cmp_name:'',website:'',designation:'',location:'',job_type:'',description:''})

    const handleChange = (e)=> setForm({...form,[e.target.name]:e.target.value});

    const handleCreatePost = async()=>{

        const res = await fetch(`${url}/api/v1/user/post`,{
            method:'POST',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token':token
            },
            body : JSON.stringify(form)
        })

        const data = await res.json();

        console.log('data ',data);

        if(data?.success === false){
            toast.error(data?.msg);
            setLoading(false)
            return;
        }

        toast.success(data?.msg);

        setLoading(false);

        setForm({cmp_name:' ',website:' ',designation:' ',location:' ',job_type:' ',description:' '})

    }

    return (
        <Center w={'full'}>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                w={['sm', 'md', 'lg']}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} w={'full'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Create Post
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="designation" isRequired>
                                <FormLabel>Designation</FormLabel>
                                <Input type="text" name='designation' onChange={handleChange} />
                            </FormControl>

                            <FormControl id="location" isRequired>
                                <FormLabel>Location</FormLabel>
                                <Input type="text" name='location' onChange={handleChange} />
                            </FormControl>
                            <FormControl id="company">
                                <FormLabel>Company Name</FormLabel>
                                <Input type="text" name='cmp_name' onChange={handleChange} />
                            </FormControl>
                            <FormControl id="website">
                                <FormLabel>Website Link</FormLabel>
                                <Input type="text" name='website' onChange={handleChange} />
                            </FormControl>
                            <FormControl id="type">
                                <FormLabel>Job Type</FormLabel>
                                <Select name='job_type'
                                onChange={handleChange} placeholder='Select option'>
                                    <option value='option1'>Full Time</option>
                                    <option value='option2'>Part Time</option>
                                    <option value='option3'>Remote</option>
                                </Select>
                            </FormControl>
                            <FormControl id="type">
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder='Enter description'
                                    size='sm'
                                    name='description'
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'pink.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'pink.500',
                                    }}
                                    isLoading={loading}
                                    onClick={handleCreatePost}
                                    >
                                    Save Post
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Center>
    )
}