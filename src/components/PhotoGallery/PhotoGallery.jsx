import React from 'react';

// Dummy JSON data
const imageData = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/167533/pexels-photo-167533.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Image 4",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/949406/pexels-photo-949406.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Image 5",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Image 6",
  },
];

const PhotoGallery = () => {
  return (
    <section className="container mx-auto my-10 p-8 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">Photo Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {imageData.map((image, index) => (
          <div
            key={image.id}
            className={`overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              index % 2 === 0 ? 'hover:rotate-6' : 'hover:opacity-80'
            }`}
          >
            <div
              className={`relative w-full h-full transition-all duration-500 ${
                index % 3 === 0 ? 'bg-gradient-to-t from-black via-transparent to-transparent' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover rounded-lg transition-all duration-500 ease-in-out ${
                  index % 2 === 0 ? 'hover:scale-110' : ''
                }`}
              />
              {/* Optional Overlay with text description */}
              <div
                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-lg font-semibold opacity-0 transition-all duration-300 hover:opacity-100 ${
                  index % 3 === 0 ? 'bg-black bg-opacity-50' : ''
                }`}
              >
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
