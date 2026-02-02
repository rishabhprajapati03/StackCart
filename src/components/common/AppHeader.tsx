import { ArrowLeft, Bell, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RightIcon } from "../../types/headerConfig";

interface Props {
  title: string;
  showBack?: boolean;
  rightIcon?: RightIcon;
}

const AppHeader = ({ title, showBack, rightIcon }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const handleShowBack = () => {
    navigate(-1);
  };
  return (
    <div className=" px-5 h-15 sticky top-0 z-20 bg-white">
      <div className={`h-15 flex items-center justify-between  flex-1 `}>
        {showBack && (
          <button onClick={handleShowBack}>
            <ArrowLeft className="text-[#1A1A1A]" />
          </button>
        )}
        <h2
          className={`font-semibold tracking-tight ${
            isHome ? "text-[32px]" : "text-2xl"
          }`}
        >
          {title}
        </h2>
        {rightIcon === "notification" ? (
          <Link to={"/notifications"}>
            <Bell />
          </Link>
        ) : rightIcon === "call" ? (
          <Link to={"/notifications"}>
            <Phone />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AppHeader;
