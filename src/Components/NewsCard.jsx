import { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaStar, FaEye } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  const { id, title, author, rating, total_view, thumbnail_url, details, tags } = news;

  const { name, img, published_date } = author;
  const { number, badge } = rating || {};

  const [seeMore, setSeeMore] = useState(false);

  const stars = Array.from({ length: Math.round(number) }, (_, i) => i);

  return (
    <div className="card bg-white shadow-md border rounded-xl overflow-hidden transition hover:shadow-xl">

      {/* --- Author Info --- */}
      <div className="flex justify-between items-center p-3 bg-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={img}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800 text-sm">{name}</h2>
            <p className="text-xs text-gray-500">
              {new Date(published_date).toDateString()}
            </p>
          </div>
        </div>

        <button className="flex gap-2 text-xl text-gray-700 pr-2">
          <CiBookmark className="cursor-pointer" />
          <IoShareSocialOutline className="cursor-pointer" />
        </button>
      </div>

      {/* Thumbnail */}
      <figure className="w-full">
        <img
          src={thumbnail_url}
          alt={title}
          className="w-full h-48 sm:h-56 md:h-52 object-cover"
        />
      </figure>

      {/* Content */}
      <div className="p-4">

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2">
          {title}
          {badge && (
            <span className="badge badge-secondary ml-2 capitalize">
              {badge}
            </span>
          )}
        </h2>

        {/* Details */}
        <p className="text-gray-600 text-sm">
          {seeMore ? details : details.slice(0, 160) + " "}
          <button
            onClick={() => setSeeMore(!seeMore)}
            className="text-blue-600 font-medium hover:underline"
          >
            {seeMore ? "See Less" : "See More"}
          </button>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags?.map((tag, i) => (
            <span key={i} className="badge badge-outline text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 border-t pt-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500 text-sm">
              {stars.map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span>{number}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <FaEye />
            <span>{total_view}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
