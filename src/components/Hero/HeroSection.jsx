import React, { useState } from "react";
import backgroundImage from "../../assets/header.jpg"; // লোকাল ইমেজ ইমপোর্ট
import { useNavigate } from "react-router-dom";




const HeroSection = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate=useNavigate();

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both Check-in and Check-out dates.");
      return;
    }
    
    console.log("Check-in:", checkIn ,"Check-out:", checkOut);
    
    navigate(`/rooms?check_in=${checkIn}&check_out=${checkOut}`);
  };
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // লোকাল ইমেজ ব্যবহার
    >
      {/* Overlay Filter */}
      <div className="absolute inset-0 bg-opacity-500"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold drop-shadow-lg">
          Welcome to Nature's Paradise
        </h1>
        <p className="mt-3 text-lg">
          Find your perfect getaway amidst nature's beauty
        </p>

        {/* Search Form */}
        <div className="mt-8 text-center bg-transparent bg-opacity-80 p-6 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col md:flex-row gap-4 items-center w-full max-w-2xl mx-auto justify-between">
          {/* Check-in Date */}
          <div className="relative w-full">
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="peer mt-4 w-full p-3 pt-6 pl-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent shadow-sm"
            />
            <label className="absolute left-4 top-2 text-gray-900 text-sm rounded-md bg-white px-1">
              Check-in
            </label>
          </div>

          {/* Check-out Date */}
          <div className="relative w-full">
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="peer mt-4 w-full p-3 pt-6 pl-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent shadow-sm"
            />
            <label className="absolute left-4 top-2 text-gray-900 text-sm rounded-md bg-white px-1">
              Check-out
            </label>
          </div>

          {/* Search Button */}
          <button 
          onClick={handleSearch}
          className="px-6 py-3 mt-3 text-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-800 transition-all shadow-lg w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;