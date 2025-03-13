import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [roomType, setRoomType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // URL থেকে Check-in & Check-out Date পড়ার জন্য
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const checkIn = params.get("check_in");
  const checkOut = params.get("check_out");

  useEffect(() => {
    fetchRooms();
  }, [checkIn, checkOut]);

  const fetchRooms = () => {
    setLoading(true);
    setError(null);

    let apiUrl = "http://127.0.0.1:8000/rooms/";

    // Check-in & Check-out থাকলে API-তে পাঠাবে
    if (checkIn && checkOut) {
      fetch("http://127.0.0.1:8000/rooms/check_availability/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          check_in_date: checkIn,
          check_out_date: checkOut,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setRooms(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setRooms(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    let apiUrl = "https://natures-paradise-stlb.onrender.com/rooms/";

    if (roomType) {
      apiUrl = `https://natures-paradise-stlb.onrender.com/rooms/filter_by_room_type/?room_type=${roomType}`;
    }
    if (maxPrice) {
      apiUrl = `https://natures-paradise-stlb.onrender.com/rooms/filter_by_price/?price_per_night=${maxPrice}`;
    }
    if (onlyAvailable) {
      apiUrl = `https://natures-paradise-stlb.onrender.com/rooms/filter_by_availability/`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-15 container mx-auto p-6">
      <h2 className="text-3xl text-green-700 font-bold text-center mb-6">OUR LIVING ROOM</h2>
      <p className="text-lg text-green-700 text-center mb-6">
        The Most Memorable Rest Time Starts Here.
      </p>

      {/* 🔍 Search Form */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Family Suite">Family Suite</option>
          <option value="Suite">Suite</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded-md"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={() => setOnlyAvailable(!onlyAvailable)}
          />
          <span>Only Available</span>
        </label>

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md hover:bg-green-600 transition"
        >
          Search
        </button>
      </div>

      {/* 🏨 Room List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="p-4 rounded-lg shadow-md">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{room.room_type}</h3>
              <p className="text-gray-600">
                Starting from: ${room.price_per_night}/night
              </p>
              <div className="mt-4 flex justify-start">
                <Link
                  to={`/room-details/${room.id}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No rooms available for the selected criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
