import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import medicalImage from "../../../assets/medical-deliver-app.webp";
// import logo1 from "../../../assets/Image.png";
import logo2 from "../../../assets/medicine-delivery.jpg";
import logo3 from "../../../assets/maxresdefault.jpg";
const BannerPage = () => {
  const imazeStyle = {
    height: "450px",
    witdth: "400px",
  };
  return (
    <div>
      <>
        <Swiper
          spaceBetween={30}
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
          className="mySwiper"
        >
          <SwiperSlide>
            <img style={imazeStyle} src={medicalImage} alt="logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={imazeStyle} src={logo2} alt="logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={imazeStyle} src={logo3} alt="logo" />
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default BannerPage;
