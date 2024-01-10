import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import Post from "./Components/Post";
import Display from "./Components/Display";
function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.getItem("users"));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <div>Page dont exist</div>}
        />
        <Route path="/display/:id" element={<Display />} />
        <Route path="/create" element={<Post />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
