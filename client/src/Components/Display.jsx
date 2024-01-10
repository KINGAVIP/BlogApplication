import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Display = () => {
  //   const [id, setId] = useState("");
  //   setId(useParams().id);
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [by, setBy] = useState("");
  useEffect(() => {
    axios.get(`/api/display?id=${id}`).then((resp) => {
      if (resp.data && resp.data.error) toast.error(resp.data.error);
      else {
        const a = resp.data;
        setTitle(a.title);
        setDescription(a.Description);
        setBy(a.email);
      }
    });
  }, [id]);
  return (
    <Flex flexDir={"column"} m={"5"}>
      <Heading textAlign={"center"}>
        {title && title[0].toLocaleUpperCase() + title.substring(1)}
      </Heading>
      <Text textAlign={"center"} size={"sm"} color={"gray"}>
        By:{by}
      </Text>
      <Box my="5" p="5" border={"1px"} borderColor={"red"}>
        Description:
        <Text pt="3">
          {description &&
            description[0].toLocaleUpperCase() + description.substring(1)}
        </Text>
      </Box>
    </Flex>
  );
};

export default Display;
