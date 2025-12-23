import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Categories from "../Components/HomeLayout/Categories";

const Home = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setAllNews(data))
      .catch(() => setAllNews([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <span className="loading loading-spinner loading-lg text-gray-800"></span>
      </div>
    );
  }

  // Use the first news as featured (latest news)
  const featuredNews = allNews[0];
  
  // Create filtered list excluding featured article
  const filteredNews = allNews.slice(1);
  const secondaryNews = filteredNews.slice(0, 3);
  const gridNews = filteredNews.slice(3, 11);
  const moreNews = filteredNews.slice(11, 19);

  return (
    <div className="bg-white">
      <div className="py-4 md:py-8 max-w-7xl mx-auto px-4">
        {/* TOP BANNER - BREAKING NEWS */}
        {featuredNews && (
          <div className="primary-bg text-white py-3 px-4 mb-6 md:mb-8 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded text-xs font-bold animate-pulse text-[#BB1919]">● LIVE</span>
              <Link
                to={`/news-details/${featuredNews.id}`}
                className="flex-1 text-white hover:text-white/90 text-xs md:text-base line-clamp-1 md:line-clamp-2 font-semibold"
                style={{ color: '#FFFFFF' }}
              >
                {featuredNews.title}
              </Link>
            </div>
          </div>
        )}

        {/* MAIN FEATURED + TOP STORIES LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {/* LEFT COLUMN - FEATURED STORY */}
          <div className="lg:col-span-2">
            {featuredNews && (
              <Link to={`/news-details/${featuredNews.id}`} className="group block">
                <div className="overflow-hidden rounded-lg bg-gray-300 h-48 md:h-96 mb-4 md:mb-6 relative">
                  <img
                    src={featuredNews.thumbnail_url || featuredNews.image_url || "/default-news.jpg"}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 md:p-6 text-white">
                    <p className="text-xs md:text-sm text-gray-300 mb-2">
                      {new Date(featuredNews.author?.published_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-3 md:mb-4">
                  {featuredNews.title}
                </h2>
                <p className="text-sm md:text-base text-gray-700 line-clamp-3 mb-4">
                  {featuredNews.details?.slice(0, 250)}...
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <span className="font-semibold">{featuredNews.author?.name}</span>
                  <span>•</span>
                  <span>{Math.round(Math.random() * 10000)} reads</span>
                </div>
              </Link>
            )}
          </div>

          {/* RIGHT COLUMN - TOP STORIES */}
          <div className="lg:col-span-1">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-gray-300">Top Stories</h2>
            <div className="space-y-4 md:space-y-6">
              {secondaryNews.slice(0, 5).map((news, idx) => (
                <Link key={news.id} to={`/news-details/${news.id}`} className="group pb-4 md:pb-5 border-b border-gray-200 last:border-b-0 last:pb-0 block hover:text-primary-text transition">
                  <div className="flex gap-2 mb-2">
                    <span className="text-lg md:text-xl font-bold text-gray-400 flex-shrink-0">{idx + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-bold leading-tight mb-2 line-clamp-2 group-hover:text-accent-text">
                        {news.title}
                      </h3>
                      <p className="text-xs text-gray-500">{new Date(news.author?.published_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t-2 border-gray-300 my-8 md:my-12"></div>

        {/* 3-COLUMN SECONDARY STORIES */}
        {gridNews.slice(0, 3).length > 0 && (
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-6 md:mb-8">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {gridNews.slice(0, 3).map((news) => (
                <Link key={news.id} to={`/news-details/${news.id}`} className="group">
                  <div className="overflow-hidden rounded-lg bg-gray-300 h-40 md:h-56 mb-3 md:mb-4">
                    <img
                      src={news.thumbnail_url || news.image_url || "/default-news.jpg"}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="text-sm md:text-lg font-bold leading-tight mb-2 md:mb-3 line-clamp-2 group-hover:text-accent-text transition">
                    {news.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2 hidden md:block mb-2">
                    {news.details?.slice(0, 100)}...
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(news.author?.published_date).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* DIVIDER */}
        <div className="border-t-2 border-gray-300 my-8 md:my-12"></div>

        {/* MORE STORIES - 2 COLUMN GRID */}
        {gridNews.slice(3).length > 0 && (
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-6 md:mb-8">More Stories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
              {gridNews.slice(3).map((news) => (
                <Link key={news.id} to={`/news-details/${news.id}`} className="group">
                  <div className="overflow-hidden rounded bg-gray-300 h-24 md:h-40 mb-2 md:mb-3">
                    <img src={news.thumbnail_url || news.image_url || "/default-news.jpg"} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold leading-snug mb-1 md:mb-2 group-hover:text-accent-text transition line-clamp-2 md:line-clamp-3">{news.title}</h3>
                  <p className="text-xs text-gray-500 hidden md:block">{new Date(news.author?.published_date).toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* DIVIDER */}
        <div className="border-t border-gray-200 my-4 md:my-8"></div>

        {/* MORE STORIES - FULL WIDTH GRID */}
        {moreNews.length > 0 && (
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">More Stories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
              {moreNews.map((news) => (
                <Link key={news.id} to={`/news-details/${news.id}`} className="group">
                  <div className="overflow-hidden rounded bg-gray-300 h-24 md:h-40 mb-1 md:mb-3">
                    <img src={news.thumbnail_url || news.image_url || "/default-news.jpg"} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <h3 className="text-xs md:text-base font-bold leading-snug mb-1 md:mb-2 group-hover:text-blue-600 transition line-clamp-2 md:line-clamp-3">{news.title}</h3>
                  <p className="text-xs text-gray-500 hidden md:block">{new Date(news.author?.published_date).toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
        <div className="bg-white py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Logo */}
            <div className="mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-black mb-1 md:mb-2">NEWS TODAY</h2>
              <p className="text-xs md:text-sm text-gray-600">Breaking news when it happens</p>
            </div>

            {/* Navigation Links */}
            <div className="mb-4 md:mb-8 pb-4 md:pb-8 border-b border-gray-200">
              <nav className="flex flex-wrap gap-2 md:gap-8 text-xs md:text-sm font-medium">
                <Link to="/" className="text-gray-700 hover:text-black transition">Home</Link>
                <Link to="/category/1" className="text-gray-700 hover:text-black transition">News</Link>
                <Link to="/category/5" className="text-gray-700 hover:text-black transition">Sport</Link>
                <Link to="/category/2" className="text-gray-700 hover:text-black transition">Business</Link>
                <Link to="/category/3" className="text-gray-700 hover:text-black transition">Innovation</Link>
                <Link to="/category/6" className="text-gray-700 hover:text-black transition">Culture</Link>
                <Link to="/category/6" className="hidden md:inline text-gray-700 hover:text-black transition">Arts</Link>
                <Link to="/category/6" className="hidden md:inline text-gray-700 hover:text-black transition">Travel</Link>
              </nav>
            </div>

            {/* Social Media */}
            <div className="mb-4 md:mb-8 pb-4 md:pb-8 border-b border-gray-200">
              <p className="text-xs md:text-sm font-medium mb-3 md:mb-4 text-gray-700">Follow us on:</p>
              <div className="flex gap-2 md:gap-4">
                <a href="https://www.facebook.com/raihanns143" target="_blank" rel="noopener noreferrer" className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg hover:scale-110 transition duration-300 font-bold text-sm md:text-lg" style={{color: '#FFFFFF'}}>f</a>
                <a href="https://www.instagram.com/raihanns143/" target="_blank" rel="noopener noreferrer" className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition duration-300 text-xs md:text-sm font-bold" style={{color: '#FFFFFF'}}>◉</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 hover:shadow-lg hover:scale-110 transition duration-300 font-bold text-xs" style={{color: '#FFFFFF'}}>in</a>
                <a href="https://github.com/raihsnns143" target="_blank" rel="noopener noreferrer" className="w-8 md:w-10 h-8 md:h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-black hover:shadow-lg hover:scale-110 transition duration-300 font-bold text-sm md:text-lg" style={{color: '#FFFFFF'}}>⚙</a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="mb-4 md:mb-8 pb-4 md:pb-8 border-b border-gray-200">
              <nav className="flex flex-wrap gap-2 md:gap-6 text-xs text-gray-600">
                <Link to="/terms-of-service" className="hover:text-black transition">Terms of Use</Link>
                <Link to="/about" className="hover:text-black transition">About</Link>
                <Link to="/privacy-policy" className="hover:text-black transition">Privacy</Link>
                <Link to="/cookies-policy" className="hover:text-black transition">Cookies</Link>
                <Link to="/contact-us" className="hover:text-black transition">Contact</Link>
                <a href="#" className="hidden md:inline hover:text-black transition">Advertise</a>
              </nav>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-600">
              <p>© {new Date().getFullYear()} News Today. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
