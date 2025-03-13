import React from "react";

const About = () => {
  return (
    <section className="container mx-auto mt-10 px-6 py-12">
      <div>
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
          About Nature's Paradise
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image Section with Fancy Overlap */}
        <div className="relative w-full h-[400px]">
          {/* Main Image */}
          <img
            src="https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Nature"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          
          {/* Overlapping Small Image */}
          <img
            src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Waterfall"
            className="absolute top-6 left-6 w-1/3 border-4 border-white rounded-lg shadow-xl transform rotate-6"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-green-700">
            🌿 Welcome to Nature's Paradise
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Explore the serene beauty of untouched landscapes, where the air is
            fresh, the water is crystal clear, and nature sings its sweetest melody.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Whether you seek adventure or peace, our paradise offers a haven for
            all nature lovers. Feel the crisp mountain breeze, listen to the
            rustling leaves, and embrace the magic of the wild.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
