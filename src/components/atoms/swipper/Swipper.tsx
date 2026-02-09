import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Swipper = () => {
  return (
    <div className="h-[40dvh] md:h-[50dvh]">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="./banner-1.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-2.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-3.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-4.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-5.png" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-6.png" alt="..." />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Swipper;
