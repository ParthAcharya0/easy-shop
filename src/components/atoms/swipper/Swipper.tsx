import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Swipper = () => {
  return (
    <div className="aspect-3/1 sm:aspect-4/1">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        // autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="./banner-1.webp" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-2.webp" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-3.webp" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-4.webp" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-5.webp" alt="..." />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./banner-6.webp" alt="..." />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Swipper;
