import { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaStar, FaEye } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  const { id, title, author, rating, thumbnail_url, details, tags } = news;

  const { name, img, published_date } = author;
  const { number, badge } = rating || {};

  const [seeMore, setSeeMore] = useState(false);

  const stars = Array.from({ length: Math.round(number) }, (_, i) => i);

  return (
    <div className="card bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-professional-lg hover:-translate-y-1 duration-300">

      {/* --- Author Info --- */}
      <div className="flex justify-between items-center p-4 section-bg border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={img}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h2 className="font-semibold text-gray-800 text-sm">{name}</h2>
            <p className="text-xs text-gray-500">
              {new Date(published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex gap-2 text-lg text-gray-600">
          <CiBookmark className="cursor-pointer hover:text-black transition" />
          <IoShareSocialOutline className="cursor-pointer hover:text-black transition" />
        </div>
      </div>

      {/* Thumbnail */}
      <figure className="w-full overflow-hidden bg-gray-300 h-48">
        <img
          src={thumbnail_url}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </figure>

      {/* Content */}
      <div className="p-4">

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-[#000000] transition">
          {title}
          {badge && (
            <span className="badge ml-2 capitalize text-xs primary-text" style={{backgroundColor:'#F4F4F4', color:'#C9A227'}}>
              {badge}
            </span>
          )}
        </h2>

        {/* Details */}
        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
          {seeMore ? details : details.slice(0, 120) + " "}
            <button
            onClick={() => setSeeMore(!seeMore)}
            className="text-black font-semibold hover:underline"
          >
            {seeMore ? "Less" : "More"}
          </button>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3 mb-3">
          {tags?.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full accent-bg primary-text">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-gray-200 pt-3 text-sm">
          <div className="flex items-center gap-1">
            <div className="flex primary-text text-xs">
              {stars.map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="text-gray-700 font-semibold ml-1">{number}</span>
          </div>

          <Link
            to={`/news-details/${id}`}
            className="font-semibold hover:text-gray-900 transition primary-text"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
