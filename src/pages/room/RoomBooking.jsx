import React, { useState, useEffect } from "react";

const RoomBooking = ({ room }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestNumber, setGuestNumber] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [roomPrice, setRoomPrice] = useState(0);

  // Fetch room price when component loads
  useEffect(() => {
    fetch(`https://natures-paradise-stlb.onrender.com/rooms/${room}/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.price_per_night) {
          setRoomPrice(data.price_per_night);
        } else {
          setError("Room price not found.");
        }
      })
      .catch(() => {
        setError("Failed to fetch room price.");
      });
  }, [room]);

  // Function to calculate total price
  const calculateTotalPrice = (checkIn, checkOut, pricePerNight) => {
    if (!checkIn || !checkOut) return 0;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = (checkOutDate - checkInDate) / (1000 * 3600 * 24); // Days difference

    if (nights < 1) {
      setError("Check-out date must be later than check-in date.");
      return 0;
    }

    return pricePerNight * nights;
  };

  // Update total price when check-in or check-out date changes
  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(checkInDate, checkOutDate, roomPrice);
    setTotalPrice(newTotalPrice);
  }, [checkInDate, checkOutDate, roomPrice]); // Runs when any of these change

  const roomBooking = (event) => {
    event.preventDefault();

    const user = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!user || !room || !token) {
      setError("User, Room, or Token not found.");
      return;
    }

    setLoading(true);

    if (!checkInDate || !checkOutDate) {
      setError("Please provide both check-in and check-out dates.");
      setLoading(false);
      return;
    }

    if (totalPrice === 0) {
      setLoading(false);
      return;
    }

    const bookingData = {
      user: user,
      room: room,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      guest_number: guestNumber,
      total_price: totalPrice.toFixed(2),
      status: "Pending",
    };

    fetch("https://natures-paradise-stlb.onrender.com/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setError(errorData.error || "Only logged in users can make bookings.");
            throw new Error("Failed to create booking");
          });
        }
        return response.json();
      })
      .then(() => {
        alert("Your booking is currently pending. Please wait for confirmation.");
        setLoading(false);
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Room Booking</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={roomBooking}>
        <div className="mb-4">
          <label htmlFor="check-in" className="block text-sm font-medium text-gray-700">Check-in Date</label>
          <input
            type="date"
            id="check-in"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="check-out" className="block text-sm font-medium text-gray-700">Check-out Date</label>
          <input
            type="date"
            id="check-out"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="guest-number" className="block text-sm font-medium text-gray-700">Number of Guests</label>
          <input
            type="number"
            id="guest-number"
            value={guestNumber}
            onChange={(e) => setGuestNumber(e.target.value)}
            min="1"
            required
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Room"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomBooking;
