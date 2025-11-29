import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setCategories(data);
      })
      .catch(() => {
        if (mounted) setCategories([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-bold text-lg mb-4">All Categories</h3>
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold text-lg mb-4">All Categories</h3>

      <nav aria-label="News categories">
        {/* mobile: horizontal scroll of compact "pills"; md+: stacked full-width buttons (old style) */}
        <div className="flex md:block gap-2 overflow-x-auto md:overflow-visible px-2 -mx-2 md:mx-0">
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/category/${category.id}`}
              className={({ isActive }) =>
                `min-w-max flex-shrink-0 inline-block whitespace-nowrap px-4 py-2 transition-colors
                 ${isActive ? "bg-accent text-white" : "bg-base-100 hover:bg-base-200 text-accent"}
                 rounded-full md:rounded-md md:w-full text-left`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Categories;