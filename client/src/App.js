// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Feed from "./pages/VideoFeed.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Landing from "./pages/LandingPage.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import RoleSelection from "./pages/RoleSelection.jsx";
// import Homepage from "./pages/HomePage.jsx";
// import UploadVideo from "./pages/UploadVideo.jsx";
// import ProfilePanel from "./pages/ProfilePanel.jsx";
// import Profile from "./pages/Profile.jsx"; // ⬅️ Import Profile page

// function App() {
//   return (
//     <div className="bg-gray-900 text-white">
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/select-role" element={<RoleSelection />} />
//         <Route path="/Homepage" element={<Homepage />} />
//         <Route path="/UploadVideo" element={<UploadVideo />} />
//         <Route path="/ProfilePanel" element={<ProfilePanel />} />
//         <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
//         <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
//       </Routes>
//     </div>
//   );
// }

// export default App;




// just for Testing purpose as login page failed to get login 

import React from "react";
import { Routes, Route } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute.jsx";
import Homepage from "./pages/HomePage.jsx";
import UploadVideo from "./pages/UploadVideo.jsx";
import Profile from "./pages/Profile.jsx"; // ⬅️ Import Profile page
import SignIn from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
// import SignIn from "./pages/Signin.jsx";
import Challenges from "./pages/Challenges.jsx"; 

function App() {                                
  return (
    <div className="min-h-screen bg-primary text-white">
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* 👈 Now Homepage is the default */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/signin" element={<SignIn />} /> */}
        <Route path="/UploadVideo" element={<UploadVideo />} />
        {/* <Route path="/post" element={<UploadVideo />} />  */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/challenges" element={<Challenges />} /> {/* Route for Challenges page */}

      </Routes>
    </div>
  );
}

export default App;
