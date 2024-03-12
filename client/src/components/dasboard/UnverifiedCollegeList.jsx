// Chakra imports
import { Flex, Text, useColorModeValue, Card, CardBody, CardHeader, Box } from "@chakra-ui/react";
// Custom components
import UnverifiedCollege from "./UnverifiedCollege";
import React from "react";
import { useSelector } from "react-redux";

const UnverifiedCollegeList = ({ title, data }) => {

    const textColor = useColorModeValue("gray.700", "white");

    const clgs = useSelector(state => state.admin.clgs);

    console.log('clgs ', clgs);

    return (
        <Box mt={'50px'} w={['94vw', 'full']} p={2}>
            <Text color={textColor} fontSize='lg' fontWeight='bold' textAlign={'center'} mb={'10px'}>
                {title}
            </Text>
            <Card my={{ lg: "24px" }} me={{ lg: "24px" }} h={'500px'} overflowY={'auto'} >
                <Flex direction='column'>
                    <CardBody>
                        <Flex direction='column' >
                            {clgs?.map((row) => {
                                return (
                                    <UnverifiedCollege
                                        _id={row?._id}
                                        key={row?._id}
                                        institute_no={row?.institute_code}
                                        name={row?.name}
                                        type={row?.institute_type}
                                        email={row?.email}
                                        phone={row?.phone}
                                        website={row?.website_link}
                                        address={row?.address}
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

export default UnverifiedCollegeList;