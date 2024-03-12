'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LogoutClg } from '../../redux/ClgSlice'
import { LogoutAdmin } from '../../redux/AdminSlice'



export default function AdminNavbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleMenuClose = () => { onClose() }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        dispatch(LogoutAdmin());

        navigate(-1)
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box fontFamily={'cursive'}>Alum-Connecct</Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {/* <Link onClick={handleMenuClose} to={'/college'}>Home</Link>
                            <Text cursor={'pointer'} >Add User</Text>
                            <Link onClick={handleMenuClose} to={'/jobs'}>Post Job</Link> */}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Profile</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={handleLogout}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <Link onClick={handleMenuClose} to={'/'}>Home</Link>
                            <Text cursor={'pointer'} onClick={() => {
                                handleMenuClose()
                            }}>About</Text>
                            <Text cursor={'pointer'} onClick={() => {
                                handleMenuClose()
                            }}>Team</Text>
                            <Link onClick={handleMenuClose} to={'/jobs'}>Jobs</Link>
                        </Stack>

                    </Box>
                ) : null}
            </Box>

        </>
    )
}