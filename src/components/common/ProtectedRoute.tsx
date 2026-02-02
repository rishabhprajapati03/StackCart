import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const ProtectedRoute = () => {
  const { user, initialized } = useAppSelector((s) => s.auth);
  if (initialized === false) return null;

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
