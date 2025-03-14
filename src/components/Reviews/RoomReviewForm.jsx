import React, { use, useState } from "react";

const RoomReviewForm = ({ roomId }) => {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("⭐⭐⭐⭐");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const userId= localStorage.getItem("user_id"); //getting id from local storage

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      user: userId,
      room: roomId,
      rating: rating,
      comment: comment,
    };

    try {
      const response = await fetch(`https://natures-paradise-stlb.onrender.com/reviews/?room_id=${roomId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reviewData),
      });
      if (response.ok) {
        setMessage("Review submitted successfully!");
        setUserName("");
        setRating("⭐⭐⭐⭐");
        setComment("");
      } else {
        setMessage("You can only leave a review after a confirmed booking.");
      }
    } catch (error) {
      setMessage("Error submitting review.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Leave a Review</h2>
      {message && <p className="text-center text-green-600 font-semibold">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
          <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
          <option value="⭐⭐⭐">⭐⭐⭐</option>
          <option value="⭐⭐">⭐⭐</option>
          <option value="⭐">⭐</option>
        </select>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default RoomReviewForm;
