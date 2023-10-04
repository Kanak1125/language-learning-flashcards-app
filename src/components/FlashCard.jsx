import React, { useState } from 'react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const FlashCard = ({cardData}) => {
    const {word, meaning, pronunciation} = cardData;
    const [isFlipped, setIsFlipped] = useState(false);
  return (
    // <div className='w-full md:w-[200px] h-[240px] bg-cyan-400 rounded-md flex items-center flex-col justify-center gap-5 cursor-pointer animate-flip'>
    //     <h2 className='text-2xl font-bold'>{word}</h2>
    //     <p>{pronunciation}</p>
    //     {/* meaning will be in the back-side of the flash card with 3d flip rotation... */}
    // </div>
    <div className="card w-full md:max-w-[333px] h-[222px] cursor-pointer">
      <div className={`card__content text-center relative bg-red-200 p-10 transition-all duration-1000 h-full rounded-md  ${isFlipped ? 'flip-card' : ''}`}> {/* this needs to be flipping when clicked */}

        <div className="card__front absolute inset-0 p-4 flex flex-col justify-center">
          <BsEyeFill 
            size={22}
            className='absolute right-4 top-4'
            onClick={() => setIsFlipped(true)}
          />
          <h3 className='card__title text-3xl font-semibold '>{word}</h3>
          <p className='card__pronunciation'>{pronunciation}</p>
        </div>

        <div className="card__back absolute inset-0 p-4 flex flex-col justify-center mirror-content">
          <BsEyeSlashFill 
            size={22}
            className='absolute right-4 top-4'
            onClick={() => setIsFlipped(false)}
          />
          <div className="card__meaning transition-all duration-300">
            {meaning}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashCard