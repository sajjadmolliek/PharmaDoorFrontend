import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import OtcBannerPage from "./OtcBannerPage";
import Review from "../Banner/Review";
import SubscribeSection from "../Banner/SubscribeSection";
import BlogPage from "../BlogSection/Blog";
import HowItWorks from "../BlogSection/HowItsWork";
import { Link } from "react-router-dom";

type Medicine = {
  id: number;
  name: string;
  medicineType: string;
  description: string;
  image: string;
};

const OtcMedicine = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const imazeStyle = {
    height: "180px",
    width: "180px",
  };
  useEffect(() => {
    fetch("/otcmedicine.json")
      .then((res) => res.json())
      .then((data) => setMedicines(data));
  }, []);

  return (
    <div className="mt-5 px-4">
      <h1 className="text-center mt-4 mb-4 text-xl  font-bold  text-black  tracking-wide">
        OTC Medicines Category
      </h1>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {medicines.map((med) => (
          <SwiperSlide key={med.id}>
            <Link to={`/otc-medicine-details?type=${med.medicineType}`}>
              <div className="bg-white rounded-xl shadow-xl p-4 h-80  flex flex-col justify-between">
                <img
                  style={imazeStyle}
                  src={med.image}
                  alt={med.name}
                  className="text-center mx-auto  object-contain mb-2"
                />
                <div>
                  <h2 className="text-lg font-semibold">{med.medicineType}</h2>
                  <p className="text-sm text-gray-600">{med.description}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-10">
        <OtcBannerPage />
      </div>
      <div className="mt-10">
        <BlogPage />
      </div>
      <div className="mt-10">
        <HowItWorks />
      </div>
      <div className="mt-10">
        <Review />
      </div>
      <div className="mt-10">
        <SubscribeSection />
      </div>
    </div>
  );
};

export default OtcMedicine;
