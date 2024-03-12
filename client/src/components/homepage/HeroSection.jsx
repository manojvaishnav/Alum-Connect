'use client'

import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Image,
    Center,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'



const HeroSection = () => {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Alumni connect{' '}
                    <Text as={'span'} color={'pink.400'}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Connecting the past with the present, forging futures together. Embracing the spirit of unity in every alumni story.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'pink'}
                        bg={'pink.400'}
                        _hover={{ bg: 'pink.500' }}>
                        <Link to={`/signup`}>Join Now</Link>
                    </Button>
                    <Button rounded={'full'} px={6}>
                        <Link to={'/signin'}>Login</Link>
                    </Button>
                </Stack>
                <Flex w={'full'}>
                    <Center w={'full'}>
                        <Image
                            src='https://img.freepik.com/free-vector/college-university-students-group-young-happy-people-standing-isolated-white-background_575670-66.jpg?w=826&t=st=1709757983~exp=1709758583~hmac=7d0384f5bcec8f2a2b67d076c0549bb2d16f77ba1868f8fa56a5a67fd3c3eae0'
                            height={{ sm: '24rem', lg: '28rem' }}
                            mt={{ base: 12, sm: 16 }}
                        />
                    </Center>
                </Flex>
            </Stack>
        </Container>
    )
}

export default HeroSection