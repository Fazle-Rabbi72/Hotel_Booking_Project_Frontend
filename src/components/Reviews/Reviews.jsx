import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://natures-paradise-stlb.onrender.com/reviews/")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        What Our Customers Say
      </h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="p-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg text-white">
            <div className="text-center">
              <p className="text-xl font-semibold">{review.user_name}</p>
              <p className="mt-4 text-lg italic">"{review.comment}"</p>
              <div className="mt-3 text-yellow-300 text-2xl">
                {review.rating}
              </div>
              <p className="text-sm mt-2 opacity-80">{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;