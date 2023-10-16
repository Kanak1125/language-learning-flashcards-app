import { useState } from 'react';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import MyModal from './MyModal';
import FlashCard from './FlashCard';
import RiCloseCircleLine from 'react-icons/ri';

const RandomCard = ({ flashCards }) => {
  const [showRandomCard, setShowRandomCard] = useState(false);
  const [currentCard, setCurrentCard] = useState({});

  function displayRandomCard() {
    setShowRandomCard(true);

    let randomIdx = Math.floor(Math.random() * flashCards.length);
    console.log(randomIdx)
    setCurrentCard(flashCards[randomIdx]);
  }

  function closeCard() {
    setShowRandomCard(false);
  }

  return (
    <>
    {showRandomCard && <MyModal>
        <FlashCard 
          // key={idx}
          cardData = {currentCard}
        />
        <div 
          className='absolute w-[32px] h-[32px] text-center align-middle leading-[32px] top-5 right-5 font-bold rounded-full transition-all cursor-pointer hover:bg-white/10 '
          onClick={closeCard}  
        >x</div>
      </MyModal>}
      <div
        className='text-white sticky ml-5 bottom-5 cursor-pointer w-[50px] h-[50px] rounded-full bg-[#0a0a0a] flex items-center justify-center animate-bounce'
        onClick={displayRandomCard}
      >
          <GiPerspectiveDiceSixFacesRandom size={24} className='z-50'/>
      </div>
    </>
  )
}

export default RandomCard