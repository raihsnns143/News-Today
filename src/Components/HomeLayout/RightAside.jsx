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
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-professional">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b-2 border-red-700 pb-3">Trending Now</h3>
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <ol className="space-y-4">
            {trendingNews.map((news, idx) => (
              <li key={news.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-red-700 text-white rounded-full font-bold text-sm">
                  {idx + 1}
                </span>
                <Link
                  to={`/news-details/${news.id}`}
                  className="flex-1 text-sm font-semibold text-gray-900 line-clamp-2 hover:text-red-700 transition"
                >
                  {news.title}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* NEWSLETTER SIGNUP */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-lg p-6 text-white shadow-professional-lg">
        <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
        <p className="text-xs opacity-90 mb-4">Get the latest news delivered to your inbox daily</p>
        <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }} className="space-y-2">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 text-sm rounded bg-white bg-opacity-20 text-white placeholder-gray-200 border border-white border-opacity-30 focus:outline-none focus:bg-opacity-30"
            required
          />
          <button
            type="submit"
            className="w-full px-3 py-2 bg-white text-black text-sm font-bold rounded hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* AD SECTION (hidden on small screens) */}
      <div className="hidden md:block bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 p-5 text-center">
        <p className="text-xs text-gray-600 font-medium mb-3">Advertisement</p>
        <div className="aspect-square bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm font-semibold">
          300x300
        </div>
      </div>
    </div>
  );
};

export default RightAside;
