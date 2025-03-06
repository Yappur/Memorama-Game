import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          Creado por: <strong>Mateo Yapur</strong>
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/mateoyapur/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-xl hover:text-blue-500 transition duration-300" />
          </a>
          <a
            href="https://github.com/Yappur"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl hover:text-gray-400 transition duration-300" />
          </a>
          <a
            href="https://www.instagram.com/yappurr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl hover:text-pink-500 transition duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
