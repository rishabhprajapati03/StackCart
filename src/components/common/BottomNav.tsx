import {
  CircleUserRound,
  Heart,
  House,
  Search,
  ShoppingCart,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
}

const BottomNav = () => {
  const tabs: NavItem[] = [
    { id: "home", path: "/", label: "Home", icon: <House /> },
    { id: "search", path: "/search", label: "Search", icon: <Search /> },
    { id: "saved", path: "/saved", label: "Saved", icon: <Heart /> },
    { id: "cart", path: "/cart", label: "Cart", icon: <ShoppingCart /> },
    {
      id: "account",
      path: "/account",
      label: "Account",
      icon: <CircleUserRound />,
    },
  ];

  return (
    <div className="sticky h-18.75 bottom-0 left-0 right-0 w-full bg-white border-t border-[#E6E6E6] px-2 py-4 flex justify-around items-center z-30">
      {tabs.map((tab) => {
        return (
          <NavLink
            to={tab.path}
            key={tab.id}
            className="flex flex-col items-center gap-0.5 min-w-12 transition-all duration-200 active:scale-90"
          >
            {({ isActive }) => (
              <>
                <span
                  className={isActive ? "text-[#1A1A1A]" : "text-[#999999]"}
                >
                  {tab.icon}
                </span>

                <span
                  className={`text-[11px] font-semibold ${
                    isActive ? "text-[#1A1A1A]" : "text-[#999999]"
                  }`}
                >
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomNav;
