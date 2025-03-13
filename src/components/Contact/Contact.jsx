import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    problem: "",
  });

  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://natures-paradise-stlb.onrender.com/contact_us/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFeedback(
        "Thank you for your message! We will get back to you shortly."
      );
    } else {
      setFeedback("There was an error. Please try again later.");
    }
  };

  return (
    <section className="container mx-auto my-10 p-8  rounded-lg shadow-lg">
      <h2 className="text-center text-black text-3xl font-bold mb-4">
        Get In Touch
      </h2>
      <p className="text-center text-black opacity-80 mb-6">
        We’d love to hear from you! Let us know your concerns or feedback.
      </p>

      <form
        id="contact-form"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name" className="text-gray-700 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Your Full Name"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-gray-700 font-semibold">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Your Phone Number"
            required
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="problem" className="text-gray-700 font-semibold">
            How can we help?
          </label>
          <textarea
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleInputChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows="5"
            placeholder="Describe your issue..."
            required
          ></textarea>
        </div>
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-800 transition duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>

      {feedback && (
        <div
          id="contact-feedback"
          className="text-center mt-4 text-white font-semibold"
        >
          {feedback}
        </div>
      )}
    </section>
  );
};

export default Contact;
