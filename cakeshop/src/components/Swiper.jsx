// components/SwiperComponent.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import '../styles.css';
import { Scrollbar } from 'swiper/modules';

const SwiperComponent = () => {
  return (
    <Swiper
      scrollbar={{
        draggable: true,
      }}
      modules={[Scrollbar]}
      className="mySwiper"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
