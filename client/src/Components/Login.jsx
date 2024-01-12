import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    const user = { email, password };
    axios.post("/api/signin", user).then((response) => {
      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        setUser(user.email);
        localStorage.setItem("users", user.email);
        navigate("/");
        navigate(0);
      }
    });
  }

  useEffect(() => {
    const handleStorage = () => {
      setUser(localStorage.getItem("users"));
    };
    window.addEventListener("storage", handleStorage());
    return () => window.removeEventListener("storage", handleStorage());
  }, []);
  if (user) {
    return <div>{user.email} is logged in</div>;
  }
  return (
    <Flex m="5" h="70vh" justifyContent={"center"} alignItems={"center"}>
      <Flex
        w={{ base: "100%", md: "50%" }}
        flexDir={"column"}
        p="4"
        textAlign={"center"}
        borderColor="gray"
        borderWidth={"2px"}
      >
        <Heading>Login</Heading>
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
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Link
            style={{ textAlign: "right", color: "blueviolet" }}
            href="/signin"
          >
            New User?
          </Link>
          <Button type="submit">Submit</Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
