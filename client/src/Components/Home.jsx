import Cards from "./Cards";
import React, { useEffect, useState } from "react";
import { SimpleGrid, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/all").then((response) => {
      if (response.data && !response.data.error) {
        setData([]);
        response.data.map((item) => {
          setData((data) => [...data, item]);
        });
      } else {
        toast.error(response.data.error);
      }
    });
  }, []);
  const [searchQuery, setSearchQuery] = React.useState("");
  const filtereddata = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Flex justifyContent={"center"} my="8">
        <Flex justify={"space-between"} align={"center"} w="50%">
          <Input
            type="text"
            placeholder="Search the blogs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></Input>
        </Flex>
      </Flex>
      <SimpleGrid
        padding={4}
        spacing={4}
        templateColumns="repeat(auto-fill,minmax(500px,1fr))"
      >
        {filtereddata &&
          filtereddata.map((item) => (
            <Cards key={item.id} by={item.email} {...item} />
          ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
