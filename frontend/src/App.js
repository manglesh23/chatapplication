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

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
