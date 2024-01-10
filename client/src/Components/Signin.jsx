import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function handleSubmit(e) {
    if (password !== confirmPassword) {
      e.preventDefault();
      toast.error("Password do not match", { autoClose: 4000 });
      return;
    }
    axios
      .post("/api/signup", { username, email, password })
      .then((response) => {
        toast.info("Kuch hua");
        if (response.status === 200) {
          console.log("Success");
          toast.success("Signup succesful", { autoClose: 4000 });
          setEmail("");
          setPassword("");
          setUsername("");
          setConfirmPassword("");
        } else {
          console.log("NO");
          toast.error("Failed to signup");
        }
      });
  }
  return (
    <>
      <ToastContainer />
      <Flex m="5" justifyContent={"center"} alignItems={"center"} h="81vh">
        <Flex
          w="50%"
          flexDir={"column"}
          p="4"
          textAlign={"center"}
          borderColor="gray"
          borderWidth={"2px"}
        >
          <Heading>SignUp</Heading>
          <form
            style={{ display: "flex", gap: "15px", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormControl>
            <Link
              style={{ textAlign: "right", color: "blueviolet" }}
              href="/login"
            >
              Already a user?
            </Link>
            <Button type="submit">Submit</Button>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default Signin;
