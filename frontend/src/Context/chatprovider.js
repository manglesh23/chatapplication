const { createContext, useState, useContext } = require("react");

const ChatContext= createContext();

const ChatProvider=({children})=>{
    const [user,setuser]=useState();
  return  <ChatContext.Provider value={{user,setuser}}>{children}</ChatContext.Provider>  
}

export const ChatState=()=>{
    return useContext(ChatContext)
}

export default ChatProvider;  

