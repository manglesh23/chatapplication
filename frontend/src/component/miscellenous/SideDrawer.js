import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  useDisclosure,
  Input,
  Toast,
  useToast,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/chatprovider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = ChatState();

  console.log("side drawer:-", user?.name);

  const navigate = useNavigate();
  const logouthandler = () => {
    console.log("log out");
    localStorage.removeItem("userInfo");
    navigate("/");
  };


  const toast = useToast();

  const handlesearch =async () => {
    console.log("search");
    if (!search) {
      toast({
        title: "Enter to search",
        isClosable: true,
        duration: 5000,
        status: "warning",
        position: "top-left",
      });
    }
    try{
      setLoading(true);

      const config={
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      };

      const {data}= await axios.get(`http://localhost:3001/user?search=${search}`,config);
      console.log("Result:-",data);
      setLoading(false);
      setSearchResult(data.msg);

    }catch(e){
      console.log("error:-",e);
      return{
        error:true,
        details:e
      }
    }
  };

  const accessChat=async(userId)=>{
    console.log(userId,"access chat");
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="white"
        width="100%"
        p="2px 1px 2px 1px"
        borderWidth="5px"
      >
        <Tooltip label="Search User" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work-sans">
          Let's Chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList>
              <MenuItem>Downlad</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logouthandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px"> Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex">
              <Input
                placeholder="Search By User"
                m="1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handlesearch}>Go</Button>
            </Box>
            {loading?(
              <ChatLoading/>

            ):(
               searchResult?.map(user=>(
                <UserListItem
                key={user._id}
                user={user}
                handlefunction={()=>accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
