import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../../redux/AdminSlice";

function TablesTableRow(props) {
    const { logo, name, email, collegeId, phone, batch, course,_id } = props;

    const dispatch = useDispatch();

    const handleDelete = ()=>{

        dispatch(DeleteUser(_id));
    }

    return (
        <Tr>
            <Td minWidth={{ sm: "250px" }} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
                    <Flex direction="column">
                        <Text
                            fontSize="md"
                            color={'gray.700'}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {name}
                        </Text>
                        <Text fontSize="sm" color="gray.500" fontWeight="normal">
                            {email}
                        </Text>
                    </Flex>
                </Flex>
            </Td>
            <Td>
                <Text fontSize="sm" color="black.400" fontWeight="normal">
                    {collegeId}
                </Text>
            </Td>
            <Td>
                <Text fontSize="sm" color="black.400" fontWeight="normal">
                    {batch}
                </Text>
            </Td>
            <Td>
                <Text fontSize="sm" color="black.400" fontWeight="normal">
                    {course}
                </Text>
            </Td>
            <Td>
                <Text fontSize="sm" color="black.400" fontWeight="normal">
                    {phone}
                </Text>
            </Td>
            <Td>
                <Button p="0px" onClick={handleDelete} bg="red.500" variant="no-hover">
                    <Text
                        fontSize="md"
                        color="white"
                        fontWeight="bold"
                        cursor="pointer"
                    >
                        <MdDelete  />
                    </Text>
                </Button>
            </Td>
        </Tr>
    );
}

export default TablesTableRow;