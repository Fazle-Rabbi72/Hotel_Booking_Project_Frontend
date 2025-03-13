import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://natures-paradise-stlb.onrender.com/rooms/")
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-green-700 font-bold text-center mb-6">OUR LIVING ROOM</h2>
      <p className="text-lg text-green-700 text-center mb-6">
        The Most Memorable Rest Time Starts Here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.slice(0, 6).map((room) => (
          <div key={room.id} className="p-4 rounded-lg shadow-md flex flex-col">
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
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md hover:bg-green-600 transition">
          <Link to="/rooms">View All Rooms</Link>
        </button>
      </div>
    </div>
  );
};

export default Room;
