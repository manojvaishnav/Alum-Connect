import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { VerifyUserByClg } from "../../redux/ClgSlice";


function ListRow(props) {
    const bgColor = useColorModeValue("#F8F9FA", "gray.800");
    const nameColor = useColorModeValue("gray.500", "white");
    const { userId, name, collegeId, email, phone, batch, stream,_id } = props;

    const dispatch = useDispatch();

    // Denied Verification
    const handleNotVerified = (userId) => { alert('Verification denied for userId: '+userId) }

    // Verification True
    const handleVerified = () => {

        dispatch(VerifyUserByClg(_id));
     }

    return (
        <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
            <Flex justify="space-between" w="100%">
                <Flex direction="column" maxWidth="100%">
                    <Text color={nameColor} fontSize="md" fontWeight="bold" mb="10px">
                        {name}
                    </Text>
                    <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                        College Id:{" "}
                        <Text as="span" color="gray.500">
                            {collegeId}
                        </Text>
                    </Text>
                    <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                        Email Address:{" "}
                        <Text as="span" color="gray.500">
                            {email}
                        </Text>
                    </Text>
                    <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                        Phone Number:{" "}
                        <Text as="span" color="gray.500">
                            {phone}
                        </Text>
                    </Text>
                    <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                        Batch:{" "}
                        <Text as="span" color="gray.500">
                            {batch}
                        </Text>
                    </Text>
                    <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                        Stream:{" "}
                        <Text as="span" color="gray.500">
                            {stream}
                        </Text>
                    </Text>
                </Flex>
                <Flex
                    direction={{ base: "column", sm: "row", md: "row" }}
                    align="flex-start"
                // p={{ md: "24px" }}
                >
                    <Button p="0px" bg="red.400" mr={'10px'} mb={'10px'} onClick={() => { handleNotVerified(userId) }}>
                        <RxCross1 />
                    </Button>
                    <Button p="0px" bg="green.400" onClick={() => { handleVerified(userId) }}>
                        <TiTick />
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}

export default ListRow;