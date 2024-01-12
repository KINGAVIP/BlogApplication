import {
  Flex,
  Spacer,
  Heading,
  Button,
  IconButton,
  useColorMode,
  Link,
  useColorModeValue,
  Box,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
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
    <>
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
        h={{ base: "5rem", lg: "fit-content" }}
        bg={useColorModeValue("teal.500", "gray.800")}
        color={useColorModeValue("white", "teal.500")}
      >
        <Heading size={"md"} mr="4">
          My Blog app
        </Heading>
        <Spacer />
        <Flex display={{ base: "none", lg: "flex" }}>
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
        <Box display={{ base: "flex", lg: "none" }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant={"outline"}
            onClick={onToggle}
          />
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box
          top={"5rem"}
          borderRadius={"10%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          textAlign={"center"}
          backgroundColor={useColorModeValue("gray.300", "gray.800")}
          position={"fixed"}
          zIndex={3}
          w={"10rem"}
          right={"0"}
        >
          <Link
            style={{ textDecoration: "none", fontWeight: "bold" }}
            _hover={{ color: "white" }}
            href="/"
            display={"block"}
            mb="2"
          >
            <Button variant={"ghost"} w="full">
              Home
            </Button>
          </Link>
          {!user ? (
            <Link
              style={{ textDecoration: "none", fontWeight: "bold" }}
              _hover={{ color: "white" }}
              href="/login"
              display={"block"}
              mb="2"
            >
              <Button variant={"ghost"} w="full">
                Login
              </Button>
            </Link>
          ) : (
            <>
              <Link
                style={{ textDecoration: "none", fontWeight: "bold" }}
                _hover={{ color: "white" }}
                href="/profile"
                display={"block"}
                mb="2"
              >
                <Button variant={"ghost"} w="full">
                  Blogs
                </Button>
              </Link>
              <Link
                style={{ textDecoration: "none", fontWeight: "bold" }}
                _hover={{ color: "white" }}
                href="/"
                display={"block"}
                mb="2"
              >
                <Button variant={"ghost"} w="full" onClick={handleLogout}>
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
        </Box>
      </Collapse>
    </>
  );
};

export default Navbar;
