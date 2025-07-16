import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import medicalImage from "../../../assets/medicine-delivery-trends.webp";
import logo2 from "../../../assets/checup.jpg";
import logo3 from "../../../assets/maxresdefault.jpg";
import logo4 from "../../../assets/medical.jpg";

const BannerPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-xl shadow-lg"
      >
        <SwiperSlide>
          <img
            src={medicalImage}
            alt="medical delivery"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={logo2}
            alt="medicine delivery"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={logo3}
            alt="pharmacy"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={logo4}
            alt="pharmacy"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerPage;
