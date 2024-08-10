// import axios from "axios";
// import React, { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/chatprovider";
import SideDrawer from "../component/miscellenous/SideDrawer";
import MyChats from "../component/miscellenous/MyChats";
import ChatBox from "../component/miscellenous/ChatBox";

const Chatpage = () => {
  // console.log("chat accessing");
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91vh"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chatpage;
