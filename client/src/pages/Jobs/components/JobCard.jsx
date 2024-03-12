import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import FullJobDetail from './FullJobDetail'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading, Stack, StackDivider, Text,
} from '@chakra-ui/react'

const JobCard = ({ detail }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <Card onClick={onOpen} mb={2}>
        <CardHeader>
          <Heading size='md'>{detail?.designation}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                {detail?.cmp_detail?.cmp_name}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {detail?.location}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Job Type
              </Heading>
              <Text pt='2' fontSize='sm'>
                {detail?.job_type}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Description
              </Heading>
              <Text pt='2' fontSize='sm' noOfLines={2}>
                {detail?.description}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Posted By
              </Heading>
              <Text pt='2' fontSize='sm' noOfLines={2}>
                {detail?.posted_by}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Full Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FullJobDetail detail={detail} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default JobCard