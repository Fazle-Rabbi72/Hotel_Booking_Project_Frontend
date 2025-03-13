import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomBooking from './RoomBooking';


const RoomDetails = () => {
  const { id } = useParams(); // Get room ID from URL
  const [room, setRoom] = useState(null); // State to store the room data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store error, if any

  // Fetch room details when component mounts
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`https://natures-paradise-stlb.onrender.com/rooms/${id}/`);
        if (!response.ok) {
          throw new Error('Room not found');
        }
        const data = await response.json();
        setRoom(data); // Set room data in state
      } catch (error) {
        setError(error.message); // Set error message if request fails
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchRoomDetails();
  }, [id]); // Re-run the effect when the ID changes

  // Render loading, error, or room details
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!room) return <p>Room not found</p>;

  return (
    <div className="container mt-15 mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Details Section */}
        <div className="room-details space-y-4">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-80 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold">{room.room_type}</h2>
          <p className="text-gray-600">{room.descirption}</p>
          <p className="text-lg font-semibold">Price: ${room.price_per_night}/night</p>
        </div>

        {/* Booking Form Section */}
        <div className="room-booking">
          <RoomBooking room={id} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
