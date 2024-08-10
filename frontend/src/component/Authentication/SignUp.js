import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SignUp = () => {
  const [show, setshow] = useState(false);
  const [showconfirm,setshowconfirm]=useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassowrd] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();

  const handleclick = () => setshow(!show);

  const handleclickConfirm=()=>setshowconfirm(!showconfirm);

  const postdetails = () => {
    console.log("post details");
  };

  const submithandler = () => {
    console.log("Sign Up or Register User");
  };

  return (
    <VStack spacing="5px" color="black" width="100%">
      <FormControl id="first-name" isRequired width="100%" borderRadius="10px">
        <FormLabel color="black" width="100%">
          Name
        </FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setname(e.target.value)}
        />
      </FormControl>

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

      <FormControl id="first-name" isRequired width="100%" borderRadius="10px">
        <FormLabel color="black" width="100%">
          Confirm password
        </FormLabel>
        <InputGroup>
          <Input
            type={showconfirm ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclickConfirm}>
              {showconfirm ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/"
            onChange={(e) => postdetails(e.target.files[0])}
          />
        </FormLabel>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submithandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
