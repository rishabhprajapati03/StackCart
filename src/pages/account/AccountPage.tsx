import {
  User,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Headphones,
  LogOut,
  Package,
  LucideIcon,
} from "lucide-react";
import Button from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearUser } from "../../store/slices/authSlice";
import { logout } from "../../services/authService";
import { showDestructiveAlert } from "../../components/ui/Alerts";
import toast from "react-hot-toast";
import { resetAllApiState } from "../../store/resetApiState";

interface AccountMenuItemProps {
  LabelIcon: LucideIcon;
  label: string;
  isLogout?: boolean;
  path: string;
  onClick?: () => void;
}

const AccountMenuItem = ({
  LabelIcon,
  label,
  path = "/",
  onClick,
  isLogout = false,
}: AccountMenuItemProps) => {
  return (
    <Link
      to={path}
      onClick={onClick}
      className="w-full flex items-center justify-between py-[25px] "
    >
      <div className="flex items-center gap-4">
        <LabelIcon
          className={`w-6 h-6 ${
            isLogout ? "text-[#ED1010]" : "text-[#1A1A1A]"
          }`}
        />

        <span
          className={`text-base ${
            isLogout ? "stroke-[#ED1010] transform" : "stroke-[#1A1A1A]"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Chevron Arrow */}
      {!isLogout && <ChevronRight className="h-6 w-6 text-[#B3B3B3]" />}
    </Link>
  );
};

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    showDestructiveAlert({
      title: "Logout?",
      message: "Are you sure you want to logout?",
      confirmText: "Yes, Logout",
      cancelText: "No, Cancel",
      onConfirm: async () => {
        try {
          await logout();
          dispatch(clearUser());
          resetAllApiState(dispatch);
          navigate("/login");
          toast.success("Logged out successfully");
        } catch (err) {
          toast.error("Logout failed. Please try again.");
          console.error("Logout failed", err);
        }
      },
    });
  };
  return (
    <div className="flex flex-col bg-white">
      <hr className=" text-[#E6E6E6]" />

      {/* Section 1*/}
      <section className="">
        <AccountMenuItem path="/orders" LabelIcon={Package} label="My Orders" />
      </section>

      <hr className="border-b-8 border-[#E6E6E6]" />

      {/* Section 2 */}
      <section className="">
        <AccountMenuItem
          path="/my-details"
          LabelIcon={User}
          label="My Details"
        />
        <hr className="border-[#E6E6E6]" />
        <AccountMenuItem
          path="/addresses"
          LabelIcon={MapPin}
          label="Address Book"
        />
        <hr className="border-[#E6E6E6]" />
        <AccountMenuItem
          path="/payment-method"
          LabelIcon={CreditCard}
          label="Payment Methods"
        />
        <hr className="border-[#E6E6E6]" />
        <AccountMenuItem
          path="/notification-settings"
          LabelIcon={Bell}
          label="Notifications"
        />
      </section>
      <hr className="border-b-8 border-[#E6E6E6]" />

      {/* Section 3*/}
      <section className="">
        <AccountMenuItem path="/faqs" LabelIcon={HelpCircle} label="FAQs" />
        <hr className="border-[#E6E6E6]" />
        <AccountMenuItem
          path="/help-center"
          LabelIcon={Headphones}
          label="Help Center"
        />
      </section>
      <hr className="border-b-8 border-[#E6E6E6] mb-6" />
      {/* SEction 4 */}
      <section>
        <Button variant="primary" onClick={handleLogout} LeftIcon={<LogOut />}>
          {"Logout"}
        </Button>
      </section>
    </div>
  );
};

export default AccountPage;
