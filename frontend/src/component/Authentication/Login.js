import {
  FormControl,
  Input,
  VStack,
  InputGroup,
  FormLabel,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [show, setshow] = useState(false);
  const [email, setemail] = useState();
  const [password, setpassowrd] = useState();

  const handleclick = () => setshow(!show);

  const submithandler = () => {
    console.log("login");
  };

  return (
    <VStack spacing="5px" color="black" width="100%">
      <FormControl id="first-name" isRequired width="100%" borderRadius="10px">
        <FormLabel color="black" width="100%">
          Email
        </FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>

      <FormControl id="first-name" isRequired width="100%" borderRadius="10px">
        <FormLabel color="black" width="100%">
          password
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setpassowrd(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submithandler}
      >
        Login
      </Button>

      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setemail("guestuser@gmail.com");
          setpassowrd("123456");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
};

export default Login;
