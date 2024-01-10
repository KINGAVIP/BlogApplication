import { Button, Flex, FormControl, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function handlePost(e) {
    console.log("Submit successfully");
    e.preventDefault();
    const email = localStorage.getItem("users");
    const data = { email, title, description };
    axios.post("/api/create", data).then((response) => {
      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Successfully created");
        setTitle("");
        setDescription("");
      }
    });
  }
  return (
    <Flex my="8" p="5" justifyContent={"center"}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          border: "2px solid gray",
          padding: "2rem 4rem",
          borderRadius: "20px",
        }}
        onSubmit={handlePost}
      >
        <FormControl>
          <Input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Textarea
            placeholder="Enter Description"
            size={"md"}
            height={"200"}
            width={"lg"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Create Post</Button>
      </form>
    </Flex>
  );
};

export default Post;
