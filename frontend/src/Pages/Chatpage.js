import axios from "axios";
import React, { useEffect, useState } from "react";

const Chatpage = () => {
  // console.log("chat accessing");
  const [chats,setchats] =useState([]);
  const fetchchat = async () => {
    try {
      const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGQ3MzhmZTVjMzMyMTQwMzc1OWU4MiIsImlhdCI6MTcyMTg4MjE0MSwiZXhwIjoxNzIxOTY4NTQxfQ.c_l0k3JU-pt8jd0iMVc2DlK9DqIWiNWvLFeZjmTNBTo"
      let { data } = await axios.get("http://localhost:7000/fetchchat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("chat access");
      console.log(data);
      setchats(data);

    } catch (error) {
      console.error("Error fetching chat:", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request data:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchchat();
  }, []);

  return <div>{chats.map((chat)=>(
    <div key={chat._id}>{chat.chatName}</div>
  ))}</div>;
};

export default Chatpage;
