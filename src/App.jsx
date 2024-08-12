import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.page";
import Signin from "./pages/Signin.page";
import SignUp from "./pages/Signup.page";
import About from "./pages/About.page";
import Profile from "./pages/Profile.page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );

}
