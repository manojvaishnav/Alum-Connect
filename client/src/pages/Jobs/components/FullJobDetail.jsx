import React from 'react'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex, HStack, Heading, Stack, StackDivider, Text, VStack
} from '@chakra-ui/react'

const FullJobDetail = ({ detail }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size='md'>{detail.designation}</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                {detail.company}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {detail.location}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Job Type
              </Heading>
              <Text pt='2' fontSize='sm'>
                {detail.job_type}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Description
              </Heading>
              <Text pt='2' fontSize='sm'>
                {detail.description}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}

export default FullJobDetail