import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import OtcBannerPage from "./OtcBannerPage";
import { Link } from "react-router-dom";

type Medicine = {
  id: number;
  name: string;
  category: string;
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
      <h1 className="bg-gray-400 p-1 text-center mx-auto w-3/5"></h1>
      <h1 className="text-center text-2xl font-bold mb-4 mt-3">
        OTC Medicines
      </h1>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
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
            <Link to={`otcimedicineDetails/${med.category}`}>
              <div className="bg-white rounded-xl shadow-xl p-4 h-80  flex flex-col justify-between">
                <img
                  style={imazeStyle}
                  src={med.image}
                  alt={med.name}
                  className="text-center mx-auto  object-contain mb-2"
                />
                <div>
                  <h2 className="text-lg font-semibold">{med.category}</h2>
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
    </div>
  );
};

export default OtcMedicine;
