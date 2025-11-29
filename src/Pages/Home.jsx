'use client';

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [breakingNews, setBreakingNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => {
        // Breaking News - First item
        if (data.length > 0) {
          setBreakingNews(data[0]);
        }

        // Trending News - items with trending badge
        const trending = data.filter((n) => n?.rating?.badge === "trending");
        setTrendingNews(trending);

        // Latest News - sorted by date
        const latest = [...data]
          .sort(
            (a, b) =>
              new Date(b?.author?.published_date) -
              new Date(a?.author?.published_date)
          )
          .slice(0, 20);
        setLatestNews(latest);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <span className="loading loading-spinner loading-lg text-gray-800"></span>
      </div>
    );

  return (
    <div className="bg-white text-gray-900">
      {/* BREAKING NEWS BANNER */}
      {breakingNews && (
        <section className="bg-black text-white py-2 px-3 md:py-3 md:px-6 sticky top-[72px] z-30 md:relative">
          <div className="max-w-7xl mx-auto flex items-center gap-2 md:gap-4">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded font-bold text-xs animate-pulse flex-shrink-0">
              LIVE
            </span>
            <Link
              to={`/news-details/${breakingNews.id}`}
              className="flex-1 line-clamp-1 hover:underline transition text-xs md:text-base font-medium"
            >
              {breakingNews.title}
            </Link>
          </div>
        </section>
      )}

      {/* MAIN CONTENT - MOBILE OPTIMIZED */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        {/* FEATURED STORY - FULL WIDTH ON MOBILE */}
        {breakingNews && (
          <Link
            to={`/news-details/${breakingNews.id}`}
            className="group relative overflow-hidden rounded-lg mb-4 md:mb-8 block"
          >
            <div className="relative h-48 md:h-96 overflow-hidden bg-gray-300">
              <img
                src={breakingNews.thumbnail_url || breakingNews.image_url || "/default-news.jpg"}
                alt={breakingNews.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <h2 className="text-lg md:text-4xl font-bold mb-2 md:mb-3 line-clamp-3 group-hover:underline">
                  {breakingNews.title}
                </h2>
                <p className="text-xs md:text-sm opacity-90">
                  {new Date(breakingNews.author?.published_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* SECONDARY STORIES - STACKED ON MOBILE */}
        <div className="space-y-4 mb-6 md:mb-8 pb-4 md:pb-8 border-b border-gray-300">
          {trendingNews.slice(0, 3).map((news) => (
            <Link
              key={news.id}
              to={`/news-details/${news.id}`}
              className="group flex gap-3 md:gap-4 hover:opacity-75 transition"
            >
              <img
                src={news.thumbnail_url || news.image_url || "/default-news.jpg"}
                alt={news.title}
                className="w-24 md:w-32 h-20 md:h-24 object-cover rounded flex-shrink-0 group-hover:scale-105 transition duration-300"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm md:text-base line-clamp-2 group-hover:underline mb-1">
                    {news.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1 md:line-clamp-2">
                    {news.details?.slice(0, 60)}...
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(news.author?.published_date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* NEWS GRID - RESPONSIVE */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {latestNews.slice(0, 8).map((news) => (
              <Link
                key={news.id}
                to={`/news-details/${news.id}`}
                className="group flex flex-col hover:opacity-75 transition"
              >
                <div className="relative overflow-hidden rounded h-40 md:h-48 mb-3 bg-gray-200">
                  <img
                    src={news.thumbnail_url || news.image_url || "/default-news.jpg"}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="font-bold text-sm md:text-base line-clamp-3 group-hover:underline mb-1 md:mb-2">
                  {news.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 flex-1 mb-2">
                  {news.details?.slice(0, 80)}...
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(news.author?.published_date).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t-2 border-gray-300 my-6 md:my-8"></div>

        {/* MORE STORIES - STACKED */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">More Stories</h2>
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            {latestNews.slice(8, 14).map((news) => (
              <Link
                key={news.id}
                to={`/news-details/${news.id}`}
                className="group flex gap-3 md:gap-4 pb-4 md:pb-0 border-b md:border-b-0 last:border-b-0 hover:opacity-75 transition"
              >
                <img
                  src={news.thumbnail_url || news.image_url || "/default-news.jpg"}
                  alt={news.title}
                  className="w-24 md:w-40 h-20 md:h-32 object-cover rounded flex-shrink-0 group-hover:scale-105 transition duration-300"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm md:text-base line-clamp-2 group-hover:underline mb-1">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {news.details?.slice(0, 100)}...
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(news.author?.published_date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 md:py-12 px-3 md:px-6 mt-8 md:mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">News Today</h3>
              <p className="text-xs md:text-sm text-gray-400">
                Your trusted source for authentic, unbiased news.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                <li><Link to="/career" className="hover:text-white transition">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Categories</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Breaking</a></li>
                <li><a href="#" className="hover:text-white transition">Tech</a></li>
                <li><a href="#" className="hover:text-white transition">Sports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">Follow Us</h4>
              <div className="flex gap-2">
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-sm">f</a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-sm">𝕏</a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-sm">📷</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-400">
            <p>© {new Date().getFullYear()} News Today. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
