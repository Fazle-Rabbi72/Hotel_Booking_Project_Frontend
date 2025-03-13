const Services = () => {
  return (
    <section
      id="service"
      className="bg-cover mt-10 bg-center bg-no-repeat py-16"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600')",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 bg-white/80 p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <p className="text-blue-500 text-lg font-semibold">SERVICES</p>
          <h2 className="text-3xl font-bold text-gray-800">
            Strive Only For The Best.
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <li className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
            <span className="text-blue-500 text-2xl">
              <i className="ri-shield-star-line"></i>
            </span>
            <p className="text-gray-700 font-medium">High Class Security</p>
          </li>
          <li className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
            <span className="text-blue-500 text-2xl">
              <i className="ri-24-hours-line"></i>
            </span>
            <p className="text-gray-700 font-medium">24 Hours Room Service</p>
          </li>
          <li className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
            <span className="text-blue-500 text-2xl">
              <i className="ri-headphone-line"></i>
            </span>
            <p className="text-gray-700 font-medium">Conference Room</p>
          </li>
          <li className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg">
            <span className="text-blue-500 text-2xl">
              <i className="ri-map-2-line"></i>
            </span>
            <p className="text-gray-700 font-medium">Tourist Guide Support</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
