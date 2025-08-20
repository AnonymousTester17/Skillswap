import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { Spinner } from "react-bootstrap";

const PrivateRoutes = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" style={{ color: "var(--main)" }} />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;