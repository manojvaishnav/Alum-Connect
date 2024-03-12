import React from 'react'
import MiniStatistics from '../statistics/MiniStatistics'
import { PiStudentFill } from "react-icons/pi";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import StudentTable from '../tables/StudentTable';
import { useSelector } from 'react-redux';


const AlumniList = ({ verifiedAlumniList }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const alumnis = useSelector(state => state.admin.alumnis);

    console.log('alumnis',alumnis);

    return (
        <>
            <Box onClick={onOpen} cursor={'pointer'}>
                <MiniStatistics
                    title={"Total Alumni"}
                    amount={alumnis?.length}
                    icon={<PiStudentFill h={"24px"} w={"24px"} color={'white'} />}
                />
            </Box>

            <Modal size={'5xl'} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Alumni List</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflowX={'auto'} >
                        <StudentTable
                            title={'All Verified Students'}
                            captions={['User', 'College_Id', 'Batch', 'Course', 'Phone']}
                            data={alumnis} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AlumniList