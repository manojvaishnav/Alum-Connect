
import {
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    Card,
    CardBody,
  } from "@chakra-ui/react";
  // Custom components
  
  import React from "react";
  import TablesTableRow from '../../components/tables/TablesTableRow'
import AdminTablesRow from "./AdminTablesRow";
  
  const CollegeTable = ({ captions, data }) => {
  
  
    return (
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} variant={'simple'}>
        <CardBody >
          <Table variant='simple' color={'black'}>
            <Thead>
              <Tr my='.8rem' pl='0px' color='gray.400'>
                {captions.map((caption, idx) => {
                  return (
                    <Th color='pink.500' key={idx} ps={idx === 0 ? "0px" : null} >
                      {caption}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, index) => {
                return (
                  <AdminTablesRow
                    _id = {row?._id}
                    key={index}
                    name={row?.name}
                    logo={row?.logo_avatar?.url}
                    email={row?.email}
                    collegeId={row?.institute_code}
                    website={row?.website_link}
                    phone={row?.phone}
                  />
  
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    );
  };
  
  export default CollegeTable;