import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="w-full max-w-md mx-auto relative">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
