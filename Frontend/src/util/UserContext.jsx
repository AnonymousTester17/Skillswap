import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Use the useLocation hook

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");

    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        setUser(userInfo);
      } catch (error) {
        console.error("Error parsing userInfo:", error);
        localStorage.removeItem("userInfo"); // Clear corrupted data
      }
    } else {
      // This is the new, more robust logic for handling public routes
      const publicPaths = ["/", "/login", "/register", "/discover"];
      const currentPath = location.pathname;

      // If the current path is NOT a public one, redirect to login.
      // This correctly allows access to the landing page ("/") and all its hash links.
      if (!publicPaths.includes(currentPath)) {
        navigate("/login");
      }
    }
  }, [location, navigate]); // Depend on location and navigate

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUser };