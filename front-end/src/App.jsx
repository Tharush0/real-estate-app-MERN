import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.page";
import Signin from "./pages/Signin.page";
import SignUp from "./pages/Signup.page";
import About from "./pages/About.page";
import Profile from "./pages/Profile.page";
import Header from "./components/Header";
import PrivateRoute from "./components/privateRoute";
import Admin from "./pages/Admin.page";
import CreateEstate from "./pages/CreateEstate.page";
import UpdateEstate from "./pages/UpdateEstate.page";
import Estate from "./pages/Estate.page";
import Serach from "./pages/Search.page";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Estate />} />
        <Route path="/search" element={<Serach/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute adminOnly={true} />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/create-estate" element={<CreateEstate />} />
          <Route path="/update-estate/:listingId" element={<UpdateEstate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
