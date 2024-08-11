import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [show, setshow] = useState(false);
  const [showconfirm, setshowconfirm] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const toast = useToast();
  const handleclick = () => setshow(!show);

  const handleclickConfirm = () => setshowconfirm(!showconfirm);

  const postdetails = (e) => {
    console.log("post details", e);
    const file = e[0];
    console.log("file:-", file);
    // if (file) {
    //   // const url = URL.createObjectURL(file);
    //   setpic(file);
    //   // console.log(url);
    // }
  };

  const clearForm = () => {
    console.log("clear form");
    setname("");
    setemail("");
    setpassword("");
    setconfirmpassword("");
    setpic(null);
  };

  const submithandler = async () => {
    console.log("Sign Up");
    if (password !== confirmpassword) {
      toast({
        title: "Password didn't match!",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
      return;
    }

    try {
      let data = JSON.stringify({
        name,
        email,
        password,
        pic,
      });
      // const formData = new FormData();
      // formData.append("name", name);
      // formData.append("email", email);
      // formData.append("password", password);
      // formData.append("pic", pic);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:7000/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      let response = await axios(config);
      console.log(response);

      toast({
        title: "Sign Up Successful!",
        description: "You have successfully signed up.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
      clearForm();
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign Up Failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-center",
      });
    }

    // finally{
    //   setname('');
    //   setemail('');
    //   setpassword('');
    //   setconfirmpassword('');
    //   setpic(null);
    // }
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
            onChange={(e) => setpassword(e.target.value)}
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
            accept="image/*"
            onChange={(e) => postdetails(e.target.files)}
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
