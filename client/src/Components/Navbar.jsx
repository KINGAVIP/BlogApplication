import {
  Flex,
  Spacer,
  Heading,
  Button,
  IconButton,
  useColorMode,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  // const user = localStorage.getItem("users");
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.getItem("users"));
  }, []);
  function handleLogout() {
    localStorage.removeItem("users");
  }
  return (
    <Flex
      top={"0"}
      position={"fixed"}
      left={"0"}
      zIndex={"2"}
      align={"center"}
      display={"flex"}
      p="5"
      width={"100vw"}
      max-width="100vw"
      h="fit-content"
      bg={useColorModeValue("teal.500", "gray.800")}
      color={useColorModeValue("white", "teal.500")}
    >
      <Heading size={"md"} mr="4">
        My Blog app
      </Heading>
      <Spacer />
      <Flex>
        <Link
          style={{ textDecoration: "none", fontWeight: "bold" }}
          _hover={{ color: "white" }}
          href="/"
        >
          <Button variant={"ghost"} mr="2">
            Home
          </Button>
        </Link>
        {!user ? (
          <Link
            style={{ textDecoration: "none", fontWeight: "bold" }}
            _hover={{ color: "white" }}
            href="/login"
          >
            <Button variant={"ghost"} mr="2">
              Login
            </Button>
          </Link>
        ) : (
          <>
            <Link
              style={{ textDecoration: "none", fontWeight: "bold" }}
              _hover={{ color: "white" }}
              href="/profile"
            >
              <Button variant={"ghost"} mr="2">
                Blogs
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none", fontWeight: "bold" }}
              _hover={{ color: "white" }}
              href="/"
            >
              <Button variant={"ghost"} mr="2" onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </>
        )}
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
