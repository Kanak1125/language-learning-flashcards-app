'use client'

import React, { useState, useRef } from 'react'
import Navbar from "@/components/Navbar";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const wordRef = useRef();
    const pronunciationRef = useRef();
    const meaningRef = useRef();

    function handleForm(e) {
        e.preventDefault();
    }
  return (
    <>
        {open && <div className='absolute min-h-screen bg-black/60 flex items-center justify-center w-full'>
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
                </div>}
        <Navbar />
        <div className='p-4 container mx-auto'>
            <h2 className='text-2xl font-semibold'>Your Flashcards</h2>
            <div className='md:w-[200px] h-[200px] bg-slate-100 rounded-md text-8xl text-center leading-[200px] cursor-pointer my-4 selec' onClick={() => setOpen(true)} title='Add new flashcard'>
                +
            </div>
        </div>
    </>
  )
}

export default Dashboard