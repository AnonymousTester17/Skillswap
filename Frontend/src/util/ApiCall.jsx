import { toast } from "react-toastify";
import axios from "axios";

export const Api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:8000",
  withCredentials: true,
});

const ApiCall = async (url, method, navigate, setUser, data) => {
  console.log("******** Inside ApiCall function ********");

  try {
    const response = await Api({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error in API call:", error);
    const message = error.response?.data?.message || "An error occurred. Please try again later.";
    toast.error(message);

    if (error.response?.status === 401) {
      if (setUser) setUser(null);
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  }
};

export default ApiCall;