'use client';

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const intervalRef = useRef(null);

  const updateSlidesPerView = () => {
    if (window.innerWidth >= 1024) setSlidesPerView(3);
    else if (window.innerWidth >= 640) setSlidesPerView(2);
    else setSlidesPerView(1);
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => {
        const trending = data.filter((n) => n?.rating?.badge === "trending");
        setFeaturedNews(trending);

        const latest = [...data]
          .sort(
            (a, b) =>
              new Date(b?.author?.published_date) -
              new Date(a?.author?.published_date)
          )
          .slice(0, 10);
        setLatestNews(latest);
        setCurrentSlide(0);
      })
      .finally(() => setLoading(false));
  }, []);

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? latestNews.length - slidesPerView : prev - 1
    );

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev >= latestNews.length - slidesPerView ? 0 : prev + 1
    );

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (latestNews.length > slidesPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) =>
          prev >= latestNews.length - slidesPerView ? 0 : prev + 1
        );
      }, 5000);
    }
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [latestNews, slidesPerView]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="bg-gray-50 text-gray-800">

      {/* Latest News Carousel */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-[#D63460]">
          Latest News
        </h2>
        <div className="relative w-full overflow-hidden rounded-xl shadow-md">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
              width: `${(latestNews.length / slidesPerView) * 100}%`,
            }}
          >
            {latestNews.map((news) => (
              <div
                key={news.id}
                className="flex-shrink-0 p-2"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col">
                  <img
                    src={news.thumbnail_url || news.image_url || "/default-news.jpg"}
                    alt={news.title}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-3">
                      {news.details?.slice(0, 120)}...
                    </p>
                    <Link
                      to={`/news-details/${news.id}`}
                      className="text-[#D63460] font-semibold hover:underline mt-auto"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            ❯
          </button>
        </div>
      </section>

      {/* Trending News */}
      <section className="py-8 px-4 sm:px-6 max-w-6xl mx-auto mt-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#D63460]">
          Trending News
        </h2>
        {featuredNews.length > 0 ? (
          <div className="flex flex-col gap-4">
            {featuredNews.map((news) => (
              <div
                key={news.id}
                className="flex flex-col sm:flex-row bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={news.thumbnail_url || news.image_url || "/default-news.jpg"}
                  alt={news.title}
                  className="w-full sm:w-1/3 h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
                />
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-3">
                    {news.details?.slice(0, 150)}...
                  </p>
                  <Link
                    to={`/news-details/${news.id}`}
                    className="text-[#D63460] font-semibold hover:underline mt-auto"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No trending news available.</p>
        )}
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-[#D63460]">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center mt-10">
        <p>© {new Date().getFullYear()} News Today. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
