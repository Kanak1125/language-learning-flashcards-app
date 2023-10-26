import { Swiper } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const MySwiper = ({ children }) => {
  return (
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
        // spaceBetween={50}
        slidesPerView={'auto'}
        // onSwiper={(swiper) => console.log(swiper)}
        // pagination={{ clickable: true }}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
        }}
        pagination={{
            clickable: true,
            el: '.__swiper__pagination',
        }}
        navigation={{
            nextEl: '.__swiper__btn__next',
            prevEl: '.__swiper__btn__prev',
            clickable: true,
        }}
    >
      { children }
      <div className="__slider__controller flex items-center justify-center mt-6 gap-4">
        <div className="__swiper__btn__prev __slider__arrow bg-white/10 hover:bg-white/20 transition-all duration-300 p-2 rounded-full">
            <FaArrowLeft size={18} />
        </div>
        <div className="__swiper__pagination text-center"></div>
        <div className="__swiper__btn__next __slider__arrow bg-white/10 hover:bg-white/20 transition-all duration-300 p-2 rounded-full">
            <FaArrowRight size={18} />
        </div>
      </div>
    </Swiper>
  )
}

export default MySwiper