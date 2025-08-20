import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/user/registered/getDetails");
        if (data.success) {
          setUser(data.data);
          localStorage.setItem("userInfo", JSON.stringify(data.data));
        }
      } catch (error) {
        // This is expected if the user is not logged in
      } finally {
        setLoading(false);
      }
    };

    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (e) {
        localStorage.removeItem("userInfo");
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserContextProvider, useUser };