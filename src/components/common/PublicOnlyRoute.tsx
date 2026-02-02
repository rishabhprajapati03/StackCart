import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const PublicOnlyRoute = () => {
  const { user, initialized } = useAppSelector((s) => s.auth);

  if (!initialized) return null;
  if (user) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default PublicOnlyRoute;
