// Chakra imports
import { Flex, Text, useColorModeValue, Card, CardBody, CardHeader, Box } from "@chakra-ui/react";
// Custom components
import ListRow from "./ListRow";
import React from "react";
import { useSelector } from "react-redux";

const UnverifiedUserList = ({ title, data }) => {

    const textColor = useColorModeValue("gray.700", "white");

    const UnverifiedStud = useSelector(state => state.clg.UnverifiedStud);

    console.log('uvner',UnverifiedStud);

    return (
        <Box mt={'50px'} w={['94vw', 'full']} p={2}>
            <Text color={textColor} fontSize='lg' fontWeight='bold' textAlign={'center'} mb={'10px'}>
                {title}
            </Text>
            <Card my={{ lg: "24px" }} me={{ lg: "24px" }} h={'500px'} overflowY={'auto'} >
                <Flex direction='column'>
                    <CardBody>
                        <Flex direction='column' >
                            {UnverifiedStud?.length <=0 && <h5>No students yet!</h5>}
                            {UnverifiedStud?.map((row) => {
                                return (
                                    <ListRow
                                        _id = {row?._id}
                                        userId={row.userId}
                                        name={row?.name}
                                        collegeId={row?.clg_id}
                                        email={row?.email}
                                        phone={row?.phone}
                                        batch={row?.passing_year?.split('T')?.[0]}
                                        stream={row?.course}
                                    />
                                );
                            })}
                        </Flex>
                    </CardBody>
                </Flex>
            </Card>
        </Box>
    );
};

export default UnverifiedUserList;