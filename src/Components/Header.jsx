import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import userImg from "../assets/user.png";
import { AuthContext } from "../Provider/AuthContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const drawerSearchRef = useRef(null);
  const userMenuRef = useRef(null);
  const lastScrollRef = useRef(0);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Focus drawer search
  useEffect(() => {
    if (menuOpen && drawerSearchRef.current) {
      setTimeout(() => drawerSearchRef.current.focus(), 80);
    }
  }, [menuOpen]);

  const handleLogout = () => {
    logOut().catch(() => {
      // Handle error silently or show toast
    });
    setUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    setSearchQuery("");
  };

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Determine scroll direction
      if (currentScroll > lastScrollRef.current && currentScroll > 100) {
        // Scrolling down - hide header
        setHeaderVisible(false);
      } else {
        // Scrolling up or at top - show header
        setHeaderVisible(true);
      }
      
      // Collapse header when scrolled
      if (currentScroll > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      lastScrollRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className={`sticky top-0 z-50 bg-white border-b border-gray-300 transition-all duration-300 transform ${!headerVisible ? '-translate-y-full' : 'translate-y-0'} ${isScrolled ? 'py-1 md:py-2 shadow-md' : 'py-2 md:py-4'}`}>
        <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-1' : 'py-0'}`}>

          {/* LEFT — search icon */}
          <div className="-ml-4">
            {/* SEARCH/MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded transition text-gray-700"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>

          {/* CENTER LOGO */}
          <div className="flex-1 flex justify-center pointer-events-none">
            <Link to="/" className="text-center pointer-events-auto">
              <h1 className={`font-bold text-gray-900 transition-all duration-300 ${isScrolled ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'}`}>
                NEWS TODAY
              </h1>
              <p className={`text-gray-600 hidden md:block transition-all duration-300 ${isScrolled ? 'text-xs opacity-0 hidden' : 'text-xs opacity-100'}`}>
                Breaking news when it happens
              </p>
            </Link>
          </div>

          {/* RIGHT — Auth buttons */}
          <div className="flex items-center gap-2 relative">
            {user ? (
              <>
                {/* Desktop view */}
                <img
                  className="hidden sm:block w-8 h-8 rounded-full object-cover"
                  src={user?.photoURL || userImg}
                  alt={user?.displayName || "User"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = userImg;
                  }}
                />
                <button
                  onClick={handleLogout}
                  className="hidden sm:block px-3 py-2 btn-primary text-sm rounded transition"
                >
                  Sign Out
                </button>

                {/* Mobile view - User icon with dropdown */}
                <div className="sm:hidden" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="p-2 hover:bg-gray-100 rounded transition"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M4 20c0-3.314 3.58-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                      <div className="px-4 py-3 border-b text-sm text-gray-700">
                        {user.displayName || "User"}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Desktop view */}
                <Link
                  to="/auth/register"
                  className="hidden sm:block px-3 py-2 btn-primary text-sm rounded transition"
                >
                  Register
                </Link>
                <Link
                  to="/auth/login"
                  className="hidden sm:block px-3 py-2 text-gray-700 text-sm hover:text-black"
                >
                  Sign In
                </Link>

                {/* Mobile view - User icon with dropdown */}
                <div className="sm:hidden" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="p-2 hover:bg-gray-100 rounded transition"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M4 20c0-3.314 3.58-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                      <Link
                        to="/auth/register"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition border-b"
                      >
                        Register
                      </Link>
                      <Link
                        to="/auth/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>



        {/* DESKTOP NAV */}
        <nav className="border-t border-gray-200 bg-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex justify-center gap-6 text-sm font-semibold uppercase tracking-wide">
            <Link to="/" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">Home</Link>
            <Link to="/category/1" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">News</Link>
            <Link to="/category/5" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">Sport</Link>
            <Link to="/category/2" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">Business</Link>
            <Link to="/category/3" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">Tech</Link>
            <Link to="/category/6" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">Culture</Link>
            <Link to="/category/7" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">World</Link>
            <Link to="/category/8" className="py-4 text-gray-700 hover:text-[#000000] border-b-2 border-transparent hover:border-[#000000] transition-colors duration-300">Video</Link>
          </div>
        </nav>
      </header>

      {/* DRAWER MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <aside className="fixed left-0 top-0 w-80 h-full bg-white z-50 shadow-lg">
            <div className="p-4 border-b flex justify-between">
              <button
                className="p-2 bg-gray-100 rounded"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
              <h2 className="font-bold">NEWS TODAY</h2>
            </div>

            <div className="p-4">
              {/* Drawer search */}
              <form onSubmit={handleSearch} className="flex gap-1 mb-6">
                <input
                  type="text"
                  ref={drawerSearchRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                />
                <button className="px-2 py-1 btn-primary rounded text-xs transition">
                  🔍
                </button>
              </form>

              {/* Divider */}
              <div className="border-t border-gray-300 mb-4"></div>

              {/* Drawer navigation */}
              <nav className="text-sm space-y-1">
                <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Home</NavLink>
                <NavLink to="/category/1" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>News</NavLink>
                <NavLink to="/category/5" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Sport</NavLink>
                <NavLink to="/category/2" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Business</NavLink>
                <NavLink to="/category/3" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Innovation</NavLink>
                <NavLink to="/category/6" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Culture</NavLink>
                <NavLink to="/category/7" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Earth</NavLink>
                <NavLink to="/category/4" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Audio</NavLink>
                <NavLink to="/category/8" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Video</NavLink>
                <NavLink to="/category/9" onClick={() => setMenuOpen(false)} className={({ isActive }) => `block px-3 py-3 rounded transition ${isActive ? 'primary-bg text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>Live</NavLink>
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;
