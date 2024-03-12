'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { MdAssuredWorkload } from "react-icons/md";


const Navbar = ({ scrollToAbout }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleMenuClose = () => { onClose() }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box fontFamily={'cursive'}>Alum-Connect</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
              <Link to={'/'}>Home</Link>
              {/* <Text cursor={'pointer'} onClick={scrollToAbout}>About</Text> */}
              {/* <Text cursor={'pointer'} onClick={scrollToAbout}>Team</Text> */}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              bg={'pink.400'}
              color={'white'}
              _hover={{
                bg: 'pink.500',
              }}
              size={['sm', 'md']}
              mr={4}
              leftIcon={<MdAssuredWorkload />}>
              <Link to={'/college-login'}>College</Link>
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link onClick={handleMenuClose} to={'/'}>Home</Link>
              <Text cursor={'pointer'} onClick={() => {
                handleMenuClose()
                scrollToAbout()
              }}>About</Text>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Navbar