// import { Button } from "@chakra-ui/react";

// import React from "react";
// import { Route } from "react-router-dom";
// import Homepage from "./Pages/Homepage";

// // import Chat from './Chat';

// function App() {
//   return (
//     <div className="App">
//       <Route path="/home" component={Homepage}/>
//     </div>
//   );
// }

// export default App;
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
