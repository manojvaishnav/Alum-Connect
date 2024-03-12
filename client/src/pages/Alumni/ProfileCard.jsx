import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProfileCard = ({ alumnis }) => {

  return (
    <>
      <Card maxW='sm'>
        <CardBody>
          <Flex alignItems={'center'} justify={'space-around'}>
            <Image
              src={alumnis?.avatar?.url ? alumnis?.avatar?.url : 'https://randomuser.me/api/portraits/men/3.jpg'}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
              w={'50%'}
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{alumnis?.name}</Heading>
              <Text
              >
                {alumnis?.experiences[0]?.designation}
              </Text>
              <Text color='blue.600' fontSize='sm'>
                Batch {alumnis?.start_year?.split('T')?.[0]}-{alumnis?.passing_year?.split('T')?.[0]}
              </Text>
            </Stack>
          </Flex>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='ghost' colorScheme='pink'>
              <Link>View Profile</Link>
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  )
}

export default ProfileCard