import React from 'react'

const FlashCard = ({cardData}) => {
    const {word, meaning, pronunciation} = cardData;
  return (
    <div className='w-[200px] h-[240px] bg-cyan-400 rounded-md flex items-center flex-col justify-center gap-5'>
        <h2 className='text-2xl font-bold'>{word}</h2>
        <p>{pronunciation}</p>
        {/* meaning will be in the back-side of the flash card with 3d flip rotation... */}
    </div>
  )
}

export default FlashCard