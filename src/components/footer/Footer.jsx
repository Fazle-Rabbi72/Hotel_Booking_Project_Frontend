import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-10 mt-10">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Nature's Paradise ✨</h2>
          <p className="text-lg">Your gateway to a peaceful and luxurious experience</p>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          <a href="/" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </a>
          <a href="/about" className="text-white hover:text-gray-300 transition duration-300">
            About
          </a>
          <a href="/services" className="text-white hover:text-gray-300 transition duration-300">
            Services
          </a>
          <a href="/contact" className="text-white hover:text-gray-300 transition duration-300">
            Contact
          </a>
        </div>

        <div className="mb-6">
          <p className="text-sm">© 2025 Nature's Paradise. All rights reserved.</p>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            <FaFacebook className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            <FaTwitter className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
