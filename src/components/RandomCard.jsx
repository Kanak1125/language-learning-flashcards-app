import { useState } from 'react';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import MyModal from './MyModal';
import FlashCard from './FlashCard';

const RandomCard = (props) => {
  const { flashCards } = props;
  const [currentCard, setCurrentCard] = useState({});
  const [showRandomCard, setShowRandomCard] = useState(false);

  if (showRandomCard) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'unset';

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
    {showRandomCard && <MyModal showRandomCard={showRandomCard} setShowRandomCard={setShowRandomCard}>
        <FlashCard 
          key={currentCard.id}
          cardData={currentCard}
          closeCard={closeCard}
        />
        <div 
          className='absolute w-[32px] h-[32px] text-center align-middle leading-[32px] top-5 right-5 font-bold rounded-full transition-all cursor-pointer bg-white/10 hover:bg-white/20'
          onClick={closeCard}  
        >X</div>
      </MyModal>}
      {flashCards.length !== 0 && <div
        className='__random__card__icon text-white fixed ml-5 bottom-5 cursor-pointer w-[50px] h-[50px] rounded-full bg-[#0a0a0a] flex items-center justify-center animate-bounce'
        onClick={displayRandomCard}
      >
          <GiPerspectiveDiceSixFacesRandom size={24} />
      </div>}
    </>
  )
}

export default RandomCard