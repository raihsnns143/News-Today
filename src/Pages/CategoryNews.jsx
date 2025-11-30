
import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import NewsCard from "../Components/NewsCard";
import RightAside from "../Components/HomeLayout/RightAside";

// Category listing page — improved layout and sorting

const CategoryNews = () => {
  const data = useLoaderData();
  const { id } = useParams();

  const [categoryNews, setCategoryNews] = useState([]);
  const [sortedNews, setSortedNews] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [categories, setCategories] = useState([]);

  // console.log(id, data);

  useEffect(() => {
    if (id == "0") {
      setCategoryNews(data);
      return;
    } else if (id == "1") {
      const filterNews = data.filter(
        (news) => news.others.is_today_pick == true
      );
      setCategoryNews(filterNews);
    } else {
      const filterNews = data.filter((news) => news.category_id === Number(id));
      // console.log(filterNews);
      setCategoryNews(filterNews);
    }
  }, [data, id]);

  useEffect(() => {
    // fetch category names to show a friendly title (public/categories.json)
    fetch("/categories.json")
      .then((res) => res.json())
      .then((c) => setCategories(c))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    // derive sortedNews from categoryNews + sortBy
    let list = [...categoryNews];
    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.author.published_date) - new Date(a.author.published_date));
    } else if (sortBy === "most_viewed") {
      list.sort((a, b) => (b.total_view || 0) - (a.total_view || 0));
    } else if (sortBy === "top_rated") {
      list.sort((a, b) => (b.rating?.number || 0) - (a.rating?.number || 0));
    }
    setSortedNews(list);
  }, [categoryNews, sortBy]);

  const categoryName = (() => {
    const found = categories.find((c) => String(c.id) === String(id));
    if (found) return found.name;
    if (id === "1") return "Today Picks";
    if (id === "0") return "All News";
    return "News";
  })();


  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Breadcrumb + Title + Controls */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div>
            <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
              <ol className="list-reset flex items-center gap-2">
                <li>
                  <Link to="/" className="hover:underline text-gray-600">Home</Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-800 font-semibold">{categoryName}</li>
              </ol>
            </nav>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Showing <span className="font-semibold text-gray-900">{categoryNews.length}</span> articles
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border rounded px-3 py-2 bg-white"
            >
              <option value="newest">Newest</option>
              <option value="most_viewed">Most Viewed</option>
              <option value="top_rated">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Page Grid: Main + Right Aside */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2 space-y-5">
            {sortedNews.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-600">No news found in this category.</div>
            ) : (
              <div className="space-y-4">
                {sortedNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
          </main>

          <aside className="lg:col-span-1">
            <RightAside />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryNews;
