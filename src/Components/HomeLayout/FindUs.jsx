import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

const FindUs = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold mb-4 text-lg">Follow Us</h3>
      <div className="flex flex-col gap-2">
        <a
          href="https://facebook.com/raihanns143"
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-full justify-start gap-2 bg-base-100 hover:bg-blue-600 hover:text-white"
        >
          <MdFacebook size={20} /> Facebook
        </a>
        <a
          href="https://linkedin.com/company/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-full justify-start gap-2 bg-base-100 hover:bg-blue-400 hover:text-white"
        >
          <FaLinkedin size={20} /> LinkedIn
        </a>
        <a
          href="https://instagram.com/raihanns143"
          target="_blank"
          rel="noopener noreferrer"
          className="btn w-full justify-start gap-2 bg-base-100 hover:bg-pink-500 hover:text-white"
        >
          <BsInstagram size={20} /> Instagram
        </a>
      </div>
    </div>
  );
};

export default FindUs;
