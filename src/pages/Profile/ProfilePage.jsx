import React, { useEffect, useState } from "react";
import BookingHistory from "../../components/BookingHistory/BookingHistory";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [balance, setBalance] = useState(0);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`https://natures-paradise-stlb.onrender.com/users/${userId}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBalance(data.balance);
        setUserData({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId, token, navigate]);

  const handleDeposit = () => {
    fetch("https://natures-paradise-stlb.onrender.com/deposit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user_id: userId, amount: parseFloat(amount) }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBalance(data.new_balance);
        setIsDepositModalOpen(false);
        setAmount("");
      })
      .catch((error) => console.error("Error depositing amount:", error));
  };

  const handleProfileUpdate = () => {
    fetch(`https://natures-paradise-stlb.onrender.com/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then(() => setIsProfileModalOpen(false))
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div>
      <div className="mt-20 container mx-auto p-6">
        {/* Profile Actions */}
        <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="text-xl font-semibold text-gray-700">
            Balance: <span className="text-green-600">${balance}</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Profile Update
            </button>
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Deposit
            </button>
          </div>
        </div>

        {/* Deposit Modal */}
        {isDepositModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Deposit Money</h2>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDepositModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeposit}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Update Modal */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
              <input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                value={userData.first_name}
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value })
                }
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                value={userData.last_name}
                onChange={(e) =>
                  setUserData({ ...userData, last_name: e.target.value })
                }
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
       {/* Booking History */}
       <BookingHistory />
    </div>
  );
};

export default ProfilePage;
