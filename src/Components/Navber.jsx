import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import userImg from "../assets/user.png";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast("Logged out successfully"))
      .catch((err) => console.log(err.message));
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">

      {/* Main Row */}
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Left - User Email */}
        <div className="text-sm font-medium text-gray-700 hidden sm:block">
          {user && user.email}
        </div>

        {/* Center - NavLinks */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/career">Career</NavLink>
        </div>

        {/* Right - Avatar + Button */}
        <div className="flex items-center gap-3">
          <img
            className="rounded-full w-10 h-10 object-cover"
            src={user ? user.photoURL : userImg}
            alt="user"
          />

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-primary px-4 py-2 text-white hidden sm:block"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth/login" className="btn btn-primary px-4 py-2 hidden sm:block">
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 border-t pt-3 flex flex-col gap-3 pb-3 text-gray-700 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/career">Career</NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-primary text-white w-full"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth/login" className="btn btn-primary text-white w-full">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navber;
