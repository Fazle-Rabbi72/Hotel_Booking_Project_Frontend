import { useEffect, useState } from "react";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`https://natures-paradise-stlb.onrender.com/bookings/?user_id=${userId}`)
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userId]);

  const cancelBooking = (bookingId) => {
    fetch(`https://natures-paradise-stlb.onrender.com/bookings/${bookingId}/`)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = {
          status: "Cancelled",
          user: data.user,
          room: data.room,
          check_in_date: data.check_in_date,
          check_out_date: data.check_out_date,
        };

        return fetch(`https://natures-paradise-stlb.onrender.com/bookings/${bookingId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update booking status");
        }
        return response.json();
      })
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
          )
        );
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Booking History</h2>
      
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">Room Image</th>
              <th className="p-4 text-left">Check-in</th>
              <th className="p-4 text-left">Check-out</th>
              <th className="p-4 text-left">Guests</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition`}
              >
                <td className="p-4">
                  <img src={booking.image} alt="Room" className="w-24 h-16 rounded-md shadow-md" />
                </td>
                <td className="p-4">{booking.check_in_date}</td>
                <td className="p-4">{booking.check_out_date}</td>
                <td className="p-4">{booking.guest_number}</td>
                <td
                  className={`p-4 font-bold text-center ${
                    booking.status === "Confirmed"
                      ? "text-green-600"
                      : booking.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-600"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="px-5 py-2 rounded-lg text-white font-semibold transition
                      bg-red-500 hover:bg-red-600 disabled:opacity-50 shadow-md"
                    disabled={booking.status === "Confirmed" || booking.status === "Cancelled"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;
