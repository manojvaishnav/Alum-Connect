// Chakra imports
import {
    Flex,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useColorModeValue,
    Card,
    CardBody,
    IconButton
  } from "@chakra-ui/react";
  import React from "react";
  
  const MiniStatistics = ({ title, amount, icon }) => {
    const textColor = useColorModeValue("gray.700", "white");
  
    return (
      <Card minH='83px'>
        <CardBody>
          <Flex flexDirection='row' align='center' justify='center' w='100%'>
            <Stat me='auto'>
              <StatLabel
                fontSize='sm'
                color='gray.400'
                fontWeight='bold'
                pb='.1rem'>
                {title}
              </StatLabel>
              <Flex>
                <StatNumber fontSize='lg' color={textColor}>
                  {amount}
                </StatNumber>
              </Flex>
            </Stat>
            <IconButton as='box' h={"45px"} w={"45px"} bg={'pink.400'} _hover={{bg:'pink.500'}}>
              {icon}
            </IconButton>
          </Flex>
        </CardBody>
      </Card>
    );
  };
  
  export default MiniStatistics;