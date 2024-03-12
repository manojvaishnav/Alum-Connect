'use client'

import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react'
import { BiSolidInstitution } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { MdWork } from "react-icons/md";

function StatsCard(props) {
    const { title, stat, icon } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    )
}

export default function Statistics() {
    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'} >
                Our platform is expanding.
            </chakra.h1>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <StatsCard title={'Colleges'} stat={'50+'} icon={<BiSolidInstitution size={'3em'} />} />
                <StatsCard title={'Alumni'} stat={'1,000+'} icon={<PiStudentBold size={'3em'} />} />
                <StatsCard title={'Students'} stat={'7000+'} icon={<FaUser size={'3em'} />} />
                <StatsCard title={'Jobs Posted'} stat={'700+'} icon={<MdWork size={'3em'} />} />
            </SimpleGrid>
        </Box>
    )
}