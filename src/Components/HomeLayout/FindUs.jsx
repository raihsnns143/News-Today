import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

const FindUs = () => {
  return (
    <div>
      <div>
        <h3 className="font-bold mb-5">Find Us on</h3>

        <div className="join join-vertical w-full">

          <a
            href="https://facebook.com/raihanns143"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-base-100 justify-start join-item hover:bg-secondary hover:text-white"
          >
            <MdFacebook size={25}/> Facebook
          </a>

          <a
            href="https://linkedin.com/company/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-base-100 justify-start join-item hover:bg-secondary hover:text-white"
          >
            <FaLinkedin size={20}/> Linkedin
          </a>

          <a
            href="https://instagram.com/raihanns143"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-base-100 justify-start join-item hover:bg-secondary hover:text-white"
          >
            <BsInstagram size={20}/> Instagram
          </a>

        </div>
      </div>
    </div>
  );
};

export default FindUs;
