import { useState } from 'react';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import MyModal from './MyModal';
import FlashCard from './FlashCard';

const RandomCard = (props) => {
  const { flashCards, showRandomCard, setShowRandomCard } = props;
  const [currentCard, setCurrentCard] = useState({});

  // if (showRandomCard) document.body.style.overflow = 'hidden';
  // else document.body.style.overflow = 'unset';

  function displayRandomCard() {
    if (flashCards.length === 0) return;

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
          key={currentCard.id}
          cardData={currentCard}
          showRandomCard={showRandomCard}
          closeCard={closeCard}
        />
        <div 
          className='absolute w-[32px] h-[32px] text-center align-middle leading-[32px] top-5 right-5 font-bold rounded-full transition-all cursor-pointer bg-white/10 hover:bg-white/20'
          onClick={closeCard}  
        >X</div>
      </MyModal>}
      <div
        className='__random__card__icon text-white cursor-pointer w-[40px] h-[40px] hover:bg-white/10 rounded-full transition-all flex items-center justify-center duration-300'
        onClick={displayRandomCard}
      >
          <GiPerspectiveDiceSixFacesRandom size={24} />
      </div>
    </>
  )
}

export default RandomCard