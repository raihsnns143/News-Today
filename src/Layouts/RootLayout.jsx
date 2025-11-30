import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../Components/Header";
import Loading from "../Pages/Loading";

const RootLayout = () => {
  const { state } = useNavigation();

  return (
    <div className="bg-white text-black min-h-screen">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
