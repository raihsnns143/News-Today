import React from "react";
import Navber from "../Components/Navber";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <header className="py-4 px-4">
        <Navber />
      </header>
      <main className="py-5 px-4">
          <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
