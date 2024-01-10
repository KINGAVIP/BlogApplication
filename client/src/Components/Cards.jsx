import { PropTypes } from "prop-types";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  CardFooter,
  Heading,
  Button,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import YesNo from "./Modals/YesNo";
const Cards = ({ _id, title, Description, by, blog, ondelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function deleter() {
    console.log(_id);
    console.log(title);
    setIsModalOpen(true);
  }
  const handleConfirmModal = () => {
    axios.delete(`/api/delete?id=${_id}`).then((response) => {
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        console.log("DEkhte hain");
        ondelete(_id);
      }
    });
    setIsModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Card bg={useColorModeValue("gray.300")}>
      <CardHeader paddingBottom={"0"}>
        <Heading size="md">
          {title && title[0].toLocaleUpperCase() + title.substring(1)}
        </Heading>
      </CardHeader>
      <CardBody paddingBottom={"3"}>
        <Text>
          {Description &&
            Description[0].toLocaleUpperCase() +
              Description.substring(1, 200) +
              "..."}
        </Text>
      </CardBody>
      <CardFooter display={"flex"} justifyContent={"space-between"}>
        <Link
          style={{ textDecoration: "none", fontWeight: "bold" }}
          _hover={{ color: "white" }}
          href={`/display/${_id}`}
        >
          <Button>View Here</Button>
        </Link>
        {by && (
          <Text my="auto" color={"gray"}>
            {by}
          </Text>
        )}
        {blog && (
          <Button onClick={deleter}>
            <DeleteIcon boxSize={5} />
          </Button>
        )}
        <YesNo
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
        />
      </CardFooter>
    </Card>
  );
};
export default Cards;
