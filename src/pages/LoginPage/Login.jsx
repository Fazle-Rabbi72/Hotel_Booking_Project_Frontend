import React, { useState } from "react";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isSignUp
      ? "https://natures-paradise-stlb.onrender.com/register/"
      : "https://natures-paradise-stlb.onrender.com/login/";
    const requestBody = isSignUp
      ? { ...formData }
      : { username: formData.username, password: formData.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);  // Store token
            localStorage.setItem("user_id", data.user_id);  // Store user_id
        }
        window.location.href = "/";
        alert(isSignUp ? "Account created successfully!" : "Login successful!");j
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Network error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-xl shadow-gray-500 rounded-2xl p-8 w-96 text-center">
        <h2 className="text-4xl font-bold text-black mb-4 drop-shadow-md">
          {isSignUp ? "Create an Account" : "Welcome Back!"}
        </h2>

        {error && <p className="text-red-500 mb-3 font-semibold">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 text-gray-900 rounded-lg focus:ring-4 focus:ring-blue-500 border border-gray-600"
            required
          />
          {isSignUp && (
            <>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 rounded-lg focus:ring-4 focus:ring-blue-500 border border-gray-600"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 rounded-lg focus:ring-4 focus:ring-blue-500 border border-gray-600"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 rounded-lg focus:ring-4 focus:ring-blue-500 border border-gray-600"
                required
              />
            </>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 text-gray-900 rounded-lg focus:ring-4 focus:ring-blue-500 border border-gray-600"
            required
          />
          {isSignUp && (
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-3 text-gray-900 rounded-lg focus:ring-4 focus:ring-blue-500 border border-gray-600"
              required
            />
          )}

          <button
            type="submit"
            className="w-full p-3 rounded-lg text-white font-bold bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-gray-900">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-400 hover:underline font-semibold"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
