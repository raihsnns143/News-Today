import React, { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-40 bg-white border-b border-gray-200 transition-all duration-300 ${scrolled ? "py-2" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className={`font-bold tracking-tight transition-all duration-300 ${scrolled ? "text-xl" : "text-3xl"} text-black`}>
          {scrolled ? "NT" : "NEWS TODAY"}
        </h1>
        <div className={`text-gray-600 text-xs transition-all duration-300 ${scrolled ? "hidden" : "block"}`}>
          Breaking news when it happens
        </div>
      </div>
    </div>
  );
};

export default Header;
