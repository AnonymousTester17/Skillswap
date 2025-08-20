import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

const PrivateRoutes = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;