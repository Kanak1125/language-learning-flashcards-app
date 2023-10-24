import React from 'react'

const MyModal = ({ showRandomCard, setShowRandomCard, children }) => {

  // function close(e) {
  //   if (showRandomCard && !e.target.closest('.__card') && !e.target.closest('.__random__card__icon')) {
  //     if (!showRandomCard) {
  //       document.removeEventListener('click', close); 
  //     }
  //     setShowRandomCard(false);
  //   }
  // }

  // document.addEventListener('click', close);

  return (
    <div className='fixed inset-0 bg-black/60 px-4 flex items-center justify-center backdrop-blur-sm z-40 '>
        { children }
    </div>
  )
}

export default MyModal