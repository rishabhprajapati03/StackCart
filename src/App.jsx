import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-stone-900 text-white py-[0.1px]">
      <Navbar />
      <main className="mt-14 pb-20">
        <div>
          <Toaster position="top-center" reverseOrder={false} />{" "}
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
