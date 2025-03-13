import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if user is logged in (you can replace this with your actual authentication logic)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Scroll Detection Function
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide Navbar when scrolling down
      } else {
        setShowNavbar(true); // Show Navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const navlinks = (
    <>
      <li>
        <Link to="/" className="hover:text-base-100">
          Home
        </Link>
      </li>
      <li>
        <Link to="/rooms" className="hover:text-base-100">
          Room
        </Link>
      </li>
      <li>
        <Link to="/about" className="hover:text-base-100">
          About
        </Link>
      </li>
      <li>
        <Link to="/services" className="hover:text-base-100">
          Services
        </Link>
      </li>
      <li>
        <Link to="/contact" className="hover:text-base-100">
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-green-500 shadow-md z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform duration-300"
        >
          Nature's Paradise ✨
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden list-none lg:flex font-bold text-gray-700 space-x-6">
          {navlinks}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-8 6h8" />
              )}
            </svg>
          </button>
        </div>

        {/* User Icon and Dropdown for Logged-in Users */}
        {isLoggedIn ? (
          <div className="hidden lg:block">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className=" m-1 hover hover:cursor-pointer text-3xl  bg-green-500">
                < FaUserAlt />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box space-y-2 z-1 w-52 p-2 shadow-sm">
                <li>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                    <Link to={"/profile"}>Profile</Link>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <Link to="/login">
              <button className="px-4 py-2 bg-green-500 text-black font-bold rounded-md hover:bg-green-600 transition duration-300">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white absolute top-16 left-0 right-0 shadow-md p-5 z-50">
          <ul className="space-y-4">{navlinks}</ul>
          {isLoggedIn ? (
            <div className="flex justify-center mt-4">
              <div className="dropdown dropdown-center">
                <div tabIndex={0} role="button" className="btn m-1">
                  <FaUserAlt />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box space-y-2 z-1 w-52 p-2 shadow-sm">
                  <li>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                      <Link to={"/profile"}>Profile</Link>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="block text-center mt-4">
              <button className="px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
