import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './heroSwiper.css';
import { Autoplay } from 'swiper/modules';
import { useContext } from 'react';
import { AppContext } from '../App';

// هنا بعتله الصور props مرة ةاحده 
function HeroSwiper({slides}) {
  const { setSelectedItem } = useContext(AppContext);

  return (
    
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      autoplay={{
          delay:2500,
          disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      className='heroSwiper'
    >
      {slides.map(slide => (
        <SwiperSlide key={slide._id}>
        <div className="slideCard" onClick={() => setSelectedItem(slide)} style={{ cursor: 'pointer' }}>
          <img
            src={process.env.PUBLIC_URL + slide.bgImg}
            alt={slide.title}
            className="slideImg"
          />
        </div>
      </SwiperSlide>
      
        // <SwiperSlide key={slide._id}>
        //   <div className="slideCard">
        //   <img src={process.env.PUBLIC_URL + slide.bgImg} alt={slide.title} className="slideImg" />

        //   </div>
        // </SwiperSlide>
      ))}
    </Swiper> 
  );
}

export default HeroSwiper;