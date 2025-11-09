import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import NewsCard from "../Components/NewsCard";

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("/dist/news.json") // 🔹 Make sure your file is here (or /news.json)
      .then((res) => res.json())
      .then((data) => {
        // 🔹 Trending News
        const trending = data.filter((n) => n.rating?.badge === "trending");
        setFeaturedNews(trending);

        // 🔹 Latest News sorted by published_date descending
        const latest = [...data]
          .sort(
            (a, b) =>
              new Date(b.author?.published_date) -
              new Date(a.author?.published_date)
          )
          .slice(0, 5);
        setLatestNews(latest);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Carousel navigation
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? latestNews.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === latestNews.length - 1 ? 0 : prev + 1
    );

  // 🔹 Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [latestNews]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800">

      {/* 🏠 Hero Section */}
      <section className="text-white py-8 text-center bg-gradient-to-r from-[#D63460] to-[#FAD6DE]">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to News Today</h1>
          <p className="text-lg leading-relaxed">
            Trusted, Transparent & Timely — Bringing the world closer through
            authentic journalism.
          </p>
        </div>
      </section>

      {/* 📰 Latest News Carousel */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#D63460]">
          Latest News
        </h2>

        {latestNews.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {latestNews.map((news) => (
                  <div
                    key={news.id}
                    className="min-w-full bg-white rounded-xl shadow-md"
                  >
                    <img
                      src={
                        news.thumbnail_url ||
                        news.image_url ||
                        "/default-news.jpg"
                      }
                      alt={news.title}
                      className="w-full h-64 object-cover rounded-t-xl"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {news.details?.slice(0, 120)}...
                      </p>
                      <Link
                        to={`/news-details/${news.id}`}
                        className="text-[#D63460] font-semibold mt-2 inline-block hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              &#10095;
            </button>
          </div>
        )}
      </section>

      {/* 🔥 Trending News */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center text-[#D63460]">
            Trending News
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.length > 0 ? (
              featuredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No trending news available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 🗂️ Categories Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-[#D63460]">
          Explore Categories
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Politics", color: "#FAD6DE" },
            { name: "Sports", color: "#D63460" },
            { name: "Technology", color: "#FAD6DE" },
            { name: "Entertainment", color: "#D63460" },
          ].map((cat, i) => (
            <div
              key={i}
              className="p-6 rounded-xl shadow text-center font-semibold cursor-pointer hover:scale-105 transition"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </section>

      {/* ⚙️ Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} News Today. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;