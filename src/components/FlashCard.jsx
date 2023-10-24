import React, { useEffect, useState, useRef } from 'react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useClickOutside } from '@/hooks/useClickOutside';

const FlashCard = ({ cardData, closeCard }) => {
    const {id, word, meaning, pronunciation, progress} = cardData;
    const [isFlipped, setIsFlipped] = useState(false);
    const [progressLabel, setProgressLabel] = useState("");
    const [currentProgress, setCurrentProgress] = useState(progress);

    const modalRef = useRef();
    useClickOutside(modalRef, () => {
      // if condition added to check if the closeCard function is passed as a prop as function when the modal is opened whereas it has been passed as UNDEFINED when the modal is closed...
      if (typeof closeCard == "function") closeCard();
    });

    const COLOR_MAP = new Map([
      ['Novice', "text-blue-400"],
      ['Intermediate', "text-green-400"],
      ['Mastered', "text-red-400"],
    ])
    console.log(progress);

    useEffect(() => {
      (async () => {
        const docRef = doc(db, 'cards', id);
        setDoc(docRef, {
          progress: currentProgress,
        }, { merge: true });  // merge: true is to prevent overwriting the whole document...
      })();

      const timer = setTimeout(() => {
        setProgressLabel(
          currentProgress <= 33 ? "Novice" :
          currentProgress >= 34 && currentProgress <= 66 ? "Intermediate" 
          : "Mastered"
        );
      }, 250);

      return () => clearTimeout(timer);
    }, [currentProgress]);

    const deleteFlashCard = async (id) => {
      const docRef = doc(db, 'cards', id);
      try {
        await deleteDoc(docRef);
      } catch (error) {
        console.log(`Error while deletion: ${error}`);
      }
    }
    
  return (
    // <div className='w-full md:w-[200px] h-[240px] bg-cyan-400 rounded-md flex items-center flex-col justify-center gap-5 cursor-pointer animate-flip'>
    //     <h2 className='text-2xl font-bold'>{word}</h2>
    //     <p>{pronunciation}</p>
    //     {/* meaning will be in the back-side of the flash card with 3d flip rotation... */}
    // </div>
    <div ref={modalRef} className="__card w-full break-all md:max-w-[333px] h-[222px] overflow-hidden">
      <div className={`card__content text-center relative p-10 transition-all duration-1000 h-full border-2 border-white/10 bg-black rounded-md __flashcard__shadow  ${isFlipped ? 'flip-card' : ''}`}> {/* this needs to be flipping when clicked */}

        <div className="card__front absolute inset-0 p-4 flex flex-col justify-center">
          <div className='__icons absolute right-4 top-4 flex gap-2 items-center'>
            <FaTrash 
              size={32}
              className='cursor-pointer rounded transition-all hover:bg-gray-50/5 p-2 '
              onClick={() => deleteFlashCard(id)}
            />
            <BsEyeFill 
              size={36}
              className='cursor-pointer rounded transition-all hover:bg-gray-50/5 p-2 '
              onClick={() => setIsFlipped(true)}
            />
          </div>
          <h3 className='card__title text-3xl font-semibold '>{word}</h3>
          <p className='card__pronunciation'>{pronunciation}</p>
          <p className={`absolute bottom-3 ${COLOR_MAP.get(progressLabel)}`}>{progressLabel}</p>
          <p></p>
        </div>

        <div className="card__back absolute inset-0 p-4 flex flex-col justify-center mirror__content">
          <BsEyeSlashFill 
            size={36}
            className='absolute right-4 top-4 cursor-pointer rounded transition-all hover:bg-gray-50/5 p-2 '
            onClick={() => setIsFlipped(false)}
          />
          <div className="card__meaning transition-all duration-300">
            {meaning}
          </div>
          <div className='progress__bar absolute left-0 bottom-0 w-full p-2 text-left '>
            <div className='progress__label p-1 w-full flex items-center justify-between'>
              <p>{progressLabel}</p>
              <p>{currentProgress}%</p>
            </div>
            <input 
              type="range" 
              name="progress" 
              id="" 
              min={0}
              max={100}
              value={currentProgress}
              className='w-full cursor-pointer __input__range'
              onChange={(e) => setCurrentProgress(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashCard