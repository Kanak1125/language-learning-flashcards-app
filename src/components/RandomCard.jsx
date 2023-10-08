import { useState } from 'react';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';

const RandomCard = () => {
  const [showRandomCard, setShowRandomCard] = useState(false);

  function displayRandomCard() {
    setShowRandomCard(true);

  }

  function closeCard() {
    setShowRandomCard(false);
  }

  return (
    <div
      className='text-white sticky ml-5 bottom-5 cursor-pointer w-[50px] h-[50px] rounded-full bg-[#0a0a0a] flex items-center justify-center animate-bounce'
      onClick={displayRandomCard}
    >
        <GiPerspectiveDiceSixFacesRandom size={24} />
    </div>
  )
}

export default RandomCard