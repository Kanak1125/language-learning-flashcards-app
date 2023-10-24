'use client'

import React, { useState, useEffect, useRef } from 'react'
import Navbar from "@/components/Navbar";
import { database, db } from '@/firebase/config';
import { doc, setDoc, where, onSnapshot, query } from "firebase/firestore";
import { useAuthContext } from '@/contexts/AuthContext';
import { v4 as uuid } from 'uuid';
import CategoryCard from './CategoryCard';
import MyModal from './MyModal';
import { useClickOutside } from '@/hooks/useClickOutside';

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const categoryRef = useRef();
    const languageRef = useRef();
    const { currentUser } = useAuthContext();
    const [categories, setCategories] = useState([]);

    const modalRef = useRef();
    useClickOutside(modalRef, () => setOpen(false));

    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    
    useEffect(() => {
        console.log(currentUser.uid);
        const getCategories = () => {
            const q = query(database.categories, where("userId", "==", currentUser.uid));
            const unsubscribe = onSnapshot(q,
                (querySnapshot) => {    // callback function to populate the categories state...
                    // querySnapshot.docChanges().forEach(change => {
                    //     if (change.type === "added") {console.log("New category: ", change.doc.data());}
                    // })
                    setCategories(
                        querySnapshot.docs.map(doc => 
                            <CategoryCard 
                                key = {doc.id}
                                docId = {doc.id}
                                docData = {doc.data()}
                            />    
                        )
                    )
                }
            )
            return () => unsubscribe();
        }
        getCategories();
    }, []);


    async function handleForm(e) {
        e.preventDefault();

        // console.log(categoryRef.current.value, languageRef.current.value);

        function closeModal() {
            setOpen(false);
        }

        const docRef = doc(db, "categories", uuid());
        await setDoc(docRef, {
            name: categoryRef.current.value,
            language: languageRef.current.value,
            userId: currentUser.uid,
            createdAt: database.getCurrentTimeStamp(),
        })
        
        categoryRef.current.value = "";
        closeModal();
    }
  return (
    <>
        {open && <MyModal>
                    <div 
                        ref={modalRef}
                        className='w-[80%] md:w-[555px] rounded-md bg-white/5 backdrop-blur-sm text-white'>
                        <h2 className='text-2xl text-center font-semibold py-4 '>Add your category</h2>
                        <hr className='border-none h-[1px] bg-gradient-to-r from-white/25'/>
                        <form onSubmit={handleForm} className='p-4 flex flex-col'>
                    <label htmlFor="word">Category </label>
                    <input
                        type="text"
                        id='word'
                        ref={categoryRef}
                        className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300'
                        placeholder='e.g. modern newa'
                        required
                    />
                    <label htmlFor="pronunciation">Language </label>
                    <input
                        type="text"
                        id='pronunciation'
                        ref={languageRef}
                        className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300'
                        placeholder='e.g. Newari'
                        required
                    />
                    <footer className='ml-auto'>
                        <input type="submit" value="Add" className='cursor-pointer bg-white hover:bg-gray-50 text-black h-8 w-20 rounded transition-all duration-300'/>
                        <button className='cursor-pointer border-2 border-white hover:bg-white hover:text-black text-white h-8 w-20 rounded transition-all duration-300 ml-4'
                        onClick={() => setOpen(false)}
                        >Close</button>
                    </footer>
                        </form>
                    </div>
        </MyModal>}
        <Navbar />
        <div className='p-4 container mx-auto'>
            <h2 className='text-2xl font-semibold'>Your Categories</h2>
            <div className='md:w-[200px] h-[200px] bg-[#0a0a0a] rounded-md text-8xl text-center leading-[200px] cursor-pointer my-4 overflow-hidden' onClick={() => setOpen(true)} title='Add new category'>
                <div className="__add__layer bg-gradient-to-r from-white/10 ">
                    +
                </div>
            </div>
            <div className='grid md:grid-cols-4 gap-14 my-14'>{categories}</div>
        </div>
    </>
  )
}

export default Dashboard