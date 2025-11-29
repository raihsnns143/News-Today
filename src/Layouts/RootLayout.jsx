import React from "react";
import { Outlet, useNavigation } from "react-router";
import Header from "../Components/Header";
import Navber from "../Components/Navber";
import LeftAside from "../Components/HomeLayout/LeftAside";
import RightAside from "../Components/HomeLayout/RightAside";
import Loading from "../Pages/Loading";

const RootLayout = () => {
  const { state } = useNavigation();

  return (
    <div>
      <header>
        <Header></Header>
        <nav className="container mx-auto my-3">
          <Navber></Navber>
        </nav>
      </header>
       <main className="container mx-auto my-3 grid grid-cols-1 md:grid-cols-12 gap-5">
        <aside className="left-side md:col-span-3 col-span-1 sticky md:top-0 h-fit">
          <LeftAside></LeftAside>
        </aside>
        <section className="main-side md:col-span-6 col-span-1">
          <Outlet></Outlet>
        </section>
        <aside className="right-side md:col-span-3 col-span-1 hidden md:block sticky md:top-0 h-fit">
          <RightAside></RightAside>
        </aside>
      </main>
    </div>
  );
};

export default RootLayout;
