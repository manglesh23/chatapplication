// import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const { createContext, useState, useContext, useEffect } = require("react");

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setuser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setuser(userInfo);
    console.log("chat pro:-",userInfo)
    console.log("user from chat provider:-",user)

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setuser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
