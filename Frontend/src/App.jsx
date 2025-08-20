import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Discover from "./Pages/Discover/Discover";
import Header from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Chats from "./Pages/Chats/Chats";
import Report from "./Pages/Report/Report";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";
import Rating from "./Pages/Rating/Rating";
import EditProfile from "./Pages/EditProfile/EditProfile";
import PrivateRoutes from "./util/PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./util/UserContext";
import { Spinner } from "react-bootstrap";

const AppLayout = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  // Routes that should not have a footer
  const noFooterRoutes = ["/chats", "/discover", "/edit_profile", "/register"];
  const shouldShowFooter = !noFooterRoutes.some(path => location.pathname.startsWith(path));

  return (
    <>
      <Header setShowLogin={setShowLogin} />
      <main style={{ minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage showLogin={showLogin} setShowLogin={setShowLogin} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/discover" element={<Discover />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/edit_profile" element={<EditProfile />} />
            <Route path="/report/:username" element={<Report />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/rating/:username" element={<Rating />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" style={{ color: "var(--main)" }}/>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <AppLayout />
    </>
  );
};

export default App;