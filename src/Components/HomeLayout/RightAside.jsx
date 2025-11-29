import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightAside = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => {
        const trending = data
          .filter((n) => n?.rating?.badge === "trending")
          .slice(0, 5);
        setTrendingNews(trending);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* MOST READ */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-3">Most Read</h3>
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <ol className="space-y-3">
            {trendingNews.map((news, idx) => (
              <li key={news.id} className="flex gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full font-bold text-sm text-gray-700">
                  {idx + 1}
                </span>
                <Link
                  to={`/news-details/${news.id}`}
                  className="flex-1 text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition"
                >
                  {news.title}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* TRENDING TOPICS */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-3">Trending</h3>
        <div className="flex flex-wrap gap-2">
          {['Breaking', 'Technology', 'Sports', 'Business', 'World', 'Science'].map((topic) => (
            <a
              key={topic}
              href="#"
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition"
            >
              {topic}
            </a>
          ))}
        </div>
      </div>

      {/* NEWSLETTER SIGNUP */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900">Stay Informed</h3>
        <p className="text-xs text-gray-600 mb-4">Get top stories delivered to your inbox</p>
        <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for signing up!'); }} className="space-y-2">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full px-3 py-2 bg-gray-900 text-white text-sm font-semibold rounded hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* AD SECTION (hidden on small screens) */}
      <div className="hidden md:block bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-5 text-center">
        <p className="text-sm text-gray-600 font-medium mb-3">Advertisement</p>
        <div className="aspect-square bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm">
          300x300
        </div>
      </div>
    </div>
  );
};

export default RightAside;
