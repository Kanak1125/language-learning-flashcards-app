import { useState } from 'react';
import { PiSlideshow } from 'react-icons/pi';
import MyModal from './MyModal';
import FlashCard from './FlashCard';
import MySwiper from './MySwiper';
import { SwiperSlide } from 'swiper/react';

const CardShow = (props) => {
    const { flashCards, openCardShow, setOpenCardShow } = props;

    function displayCardsOnSwiper() {
        setOpenCardShow(true);
    }

    const allCards = flashCards.map((card, idx) => {
        console.log(card);
        return (
          <SwiperSlide key={card.id}>
            <FlashCard 
              cardData={card}
              openCardShow={openCardShow}
            />
          </SwiperSlide>
        )
    })

    function closeCardShow() {
        setOpenCardShow(false);
    }

  return (
    <>
      {openCardShow && <MyModal>
        <MySwiper>
          {allCards}
        </MySwiper>
        <div 
          className='absolute w-[32px] h-[32px] text-center align-middle leading-[32px] top-5 right-5 font-bold rounded-full transition-all cursor-pointer bg-white/10 hover:bg-white/20'
          onClick={closeCardShow}  
        >X</div>
      </MyModal>}
      {flashCards.length > 2 && <div 
      className='cursor-pointer w-[40px] h-[40px] hover:bg-white/10 rounded-full transition-all flex items-center justify-center duration-300'
      onClick={displayCardsOnSwiper}
      >
          <PiSlideshow size={24} className='cursor-pointer'/>
      </div>}
    </>
  )
}

export default CardShow