import React from 'react'
import MiniStatistics from '../statistics/MiniStatistics'
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import StudentTable from '../tables/StudentTable';
import { useSelector } from 'react-redux';
import CollegeTable from '../tables/CollegeTable';

const CollegeList = ({ verifiedCollegeList }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const verifiedclgs = useSelector(state => state.admin.verifiedclgs);

    console.log(verifiedclgs);

    return (
        <>
            <Box onClick={onOpen} cursor={'pointer'}>
                <MiniStatistics
                    title={"Total Colleges"}
                    amount={verifiedclgs?.length}
                    icon={<HiMiniBuildingOffice2  h={"24px"} w={"24px"} color={'white'} />}
                />
            </Box>
            <Modal size={'5xl'} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>College List</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowX={'auto'} >
                        <CollegeTable
                            title={'All Verified Colleges'}
                            captions={['College', 'Institute_code', 'Email', 'website_link', 'Phone']}
                            data={verifiedclgs} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CollegeList