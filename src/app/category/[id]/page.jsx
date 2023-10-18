'use client'

import React, { useState, useRef } from 'react'
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useCategory } from '@/hooks/useCategory';
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import { database, db } from '@/firebase/config';
import FlashCard from '@/components/FlashCard';
import RandomCard from '@/components/RandomCard';
import MyModal from '@/components/MyModal';

const page = ({params}) => {
    const [open, setOpen] = useState(false);
    const wordRef = useRef();
    const pronunciationRef = useRef();
    const meaningRef = useRef();
    const { categoryId, category, child_cards : childCards } = useCategory(params.id);

    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    async function handleForm(e) {
        e.preventDefault();

        function closeModal() {
            setOpen(false);
        }

        const docRef = doc(db, 'cards', uuid());
        await setDoc(docRef, {
            word: wordRef.current.value,
            pronunciation: pronunciationRef.current.value,
            meaning: meaningRef.current.value,
            parentCategory: categoryId,   
            createdAt: database.getCurrentTimeStamp(),
            progress: 50,
        })

        closeModal();
    }

    const flashCards = childCards.map((card, idx) => {
        console.log(card);
        return (
            <FlashCard 
                key={idx}
                cardData = {card}
            />
        )
    })

  return (
    <ProtectedRoute>
        {open && <MyModal>
            <div className='bg-white w-[80%] md:w-[555px] rounded-md'>
                <h2 className='text-2xl text-center font-semibold py-4'>Add new flashcard</h2>
                <hr />
                <form onSubmit={handleForm} className='p-4 flex flex-col'>
                    <label htmlFor="word">Word </label>
                    <input
                        type="text"
                        id='word'
                        ref={wordRef}
                        className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
                        placeholder='e.g. gomenasai'
                        required
                    />
                    <label htmlFor="pronunciation">Pronunciation </label>
                    <input
                        type="text"
                        id='pronunciation'
                        ref={pronunciationRef}
                        className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
                        placeholder='go-me-naa-saii'
                        required
                    />
                    <label htmlFor="meaning">Meaning </label>
                    <input
                        type="text"
                        id='meaning'
                        ref={meaningRef}
                        className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
                        placeholder='I am sorry (informal)'
                        required
                    />
                    <footer className='ml-auto'>
                        <input type="submit" value="Add" className='cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-white h-8 w-20 rounded transition'/>
                        <button className='cursor-pointer border-2 border-slate-500 hover:bg-slate-500 hover:text-white text-slate-500 h-8 w-20 rounded transition ml-4'
                        onClick={() => setOpen(false)}
                        >Close</button>
                    </footer>
                </form>
            </div>
        </MyModal>}
        <Navbar />
        <div className='p-4 container mx-auto'>
            <h2 className='text-2xl font-semibold text-[#8e8e8e]'>Your Flashcards</h2>
            <div className='md:w-[200px] h-[200px] bg-slate-100 rounded-md text-8xl text-center leading-[200px] cursor-pointer my-4 selec' onClick={() => setOpen(true)} title='Add new flashcard'>
                +
            </div>
            <div className='grid md:grid-cols-3 gap-x-10 gap-y-5 my-10'>
                { flashCards }
            </div>
        </div>
        <RandomCard 
            flashCards={childCards}
        />
    </ProtectedRoute>
  )
}

export default page