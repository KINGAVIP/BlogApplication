import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import Cards from "./Cards";
import { useEffect, useState } from "react";
//import Cards from "./Cards";
const Profile = () => {
  const [profiledata, setProfileData] = useState([]);
  const email = localStorage.getItem("users");
  // console.log(email);
  const fetchUserData = () => {
    axios.get(`/auth/getuser?email=${email}`).then((response) => {
      if (response.data) {
        setProfileData([]);
        response.data.map((item) => {
          console.log(item);
          setProfileData((profiledata) => [...profiledata, item]);
        });
        // console.log("hi");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleDelete = (postid) => {
    const updateddata = profiledata.filter((post) => post.id !== postid);
    setProfileData(updateddata);
    fetchUserData();
  };

  return (
    <Flex py="5" flexDir={"column"} px="2">
      <Link
        href="/create"
        mx="auto"
        style={{ textDecoration: "none" }}
        _hover={{ color: "white" }}
      >
        <Button rightIcon={<AddIcon />} px={"10"} rounded={"lg"}>
          Create a New Post
        </Button>
      </Link>
      <SimpleGrid
        maxW={"100%"}
        mt="6"
        padding={0}
        spacing={4}
        columns={[1, 2, 2]}
      >
        {profiledata.map((item) => (
          <Cards
            key={item.id}
            // id={item._id}
            // title={item.title}
            // description={item.Description}
            {...item}
            blog={true}
            ondelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Profile;
