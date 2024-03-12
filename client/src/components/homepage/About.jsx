'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc'


const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}>
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
        <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
          Learn more
        </Button>
      </Stack>
    </Box>
  )
}

const About = ({ aboutSectionRef }) => {
  return (
    <Box p={4} ref={aboutSectionRef}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          About Us
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Empowering connections, our platform is a bridge between alumni, students, and faculty, fostering a vibrant community driven by shared experiences and a commitment to lifelong learning.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Colleges'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'Alumni'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'Students'}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'Jobs'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          {/* <Card
            heading={'Heading'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          /> */}
        </Flex>
      </Container>
    </Box>
  )
}

export default About