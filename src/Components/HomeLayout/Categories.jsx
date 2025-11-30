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
    return null;
  }

  return (
    <div className="py-6 border-b border-gray-300 mb-8">
      <h3 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-4">Categories</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth">
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/category/${category.id}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-[#000000] text-white shadow-professional' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
