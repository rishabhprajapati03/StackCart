import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const quantity = useSelector((store) => store.cart.quantity);
  const links = [
    { path: "/", name: "Home" },
    { path: "/wishlist", name: "Wishlist" },
  ];
  return (
    <nav className="fixed z-40 top-0 right-0 left-0 w-full px-2 sm:px-3 lg:px-6 xl:px-8 bg-black/90 h-14 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {links.map((elem) => {
          const { path, name } = elem;
          return (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold flex items-center border-b-2 border-orange-600 "
                  : "font-semibold flex items-center"
              }
            >
              {name}
            </NavLink>
          );
        })}
      </div>
      <Link to={"cart"} className=" flex items-center gap-1">
        <span className="relative px-1.5">
          <RiShoppingCartLine className="text-lg" />
          {quantity === 0 ? (
            ""
          ) : (
            <span className="absolute top-0 -translate-y-1/2 right-0  text-xs mb-2 ml-0.5 bg-orange-700 font-bold w-4 h-4 flex items-center justify-center rounded-full translate-all duration-300">
              {quantity}
            </span>
          )}
        </span>
        <span>Cart</span>
      </Link>
    </nav>
  );
};

export default Navbar;
