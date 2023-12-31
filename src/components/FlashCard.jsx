import React, { useEffect, useState, useRef } from 'react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useClickOutside } from '@/hooks/useClickOutside';
import { BiUserVoice } from 'react-icons/bi';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const FlashCard = ({ cardData, showRandomCard, closeCard, openCardShow }) => {
    const {id, word, meaning, pronunciation, progress} = cardData;
    const [isFlipped, setIsFlipped] = useState(false);
    const [progressLabel, setProgressLabel] = useState("");
    const [currentProgress, setCurrentProgress] = useState(progress);
    const pronunciationRef = useRef();
    const DEFAULT_TEXT = "Hello World!";

    const [handlePlay, handleStop] = useTextToSpeech(pronunciationRef.current?.innerText || DEFAULT_TEXT);  // sends undefined and hence the default text when the pronunciationRef.current.innerText is undefined...

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

      // console.log(progress);
      const timer = setTimeout(() => {
        // setCurrentProgress(progress);
        setProgressLabel(
          currentProgress <= 33 ? "Novice" :
          currentProgress >= 34 && currentProgress <= 66 ? "Intermediate" 
          : "Mastered"
        );
      }, 250);

      return () => clearTimeout(timer);
    }, [currentProgress]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 250);

      return () => clearTimeout(timer);
    }, [progress]);

    const deleteFlashCard = async (id) => {
      const docRef = doc(db, 'cards', id);
      try {
        await deleteDoc(docRef);
      } catch (error) {
        console.log(`Error while deletion: ${error}`);
      }
    }
    
  return (
    <div ref={modalRef} className="__card w-full break-all md:max-w-[333px] h-[222px] overflow-hidden">
      <div className={`card__content text-center relative p-10 transition-all duration-1000 h-full border-2 border-white/10 bg-black rounded-md __flashcard__shadow  ${isFlipped ? 'flip-card' : ''}`}> {/* this needs to be flipping when clicked */}

        <div className="card__front absolute inset-0 p-4 flex flex-col justify-center">
          <div className='__icons absolute right-4 top-4 flex gap-2 items-center'>
            {!showRandomCard && !openCardShow && <FaTrash 
              size={32}
              className='cursor-pointer rounded transition-all hover:bg-gray-50/5 p-2 '
              onClick={() => deleteFlashCard(id)}
            />}
            <BsEyeFill 
              size={36}
              className='cursor-pointer rounded transition-all hover:bg-gray-50/5 p-2 '
              onClick={() => setIsFlipped(true)}
            />
          </div>
          <h3 className='card__title text-3xl font-semibold '>{word}</h3>
          <div className='card__pronunciation mt-2 flex items-center justify-center'>
            <BiUserVoice size={36} className='inline-block cursor-pointer hover:bg-gray-50/5 transition-all p-2 rounded'
            onClick={handlePlay}
            />
            <p ref={pronunciationRef} className='pl-2 italic'>{pronunciation}</p>
          </div>
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
              value={ currentProgress }
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