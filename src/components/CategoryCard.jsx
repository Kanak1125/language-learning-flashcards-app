import React from 'react'
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import { database, db } from '@/firebase/config';
import { doc, deleteDoc, query, where, getDoc, getDocs } from 'firebase/firestore';

const CategoryCard = (props) => {
    const {docId, docData} = props;
    const {name, language} = docData;

    const deleteCategory = async (id) => {
      // console.log(`Deleting category with id: ${id}`);
      const docRef = doc(db, 'categories', id);

      try {
        await deleteDoc(docRef);
      } catch (err) {
        console.log(`Error deleting category with id: ${id} : ${err}`);
      }

      const q = query(database.cards, where('parentCategory', '==', id));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // console.log(doc.ref);
        deleteDoc(doc.ref);
      })
    }
    
  return (
    <div className='relative w-100 min-h-20 shadow-lg rounded-md p-3 border-2 border-white/25 md:max-w-[200px] transition-all group __category__card__shadow'>
      <Link href={`/category/${docId}`} key={docId}
      className=' '
      >
          <h1 className='text-xl font-semibold'>Category: {name}</h1>
          <hr className='h-[1px] border-none bg-gradient-to-r from-white/25 rounded my-2'/>
          <p className='text-sm'>Language: {language}</p>
      </Link>
      <div className='__icons absolute p-2 top-[-50px] right-0 hidden group-hover:block bg-gray-50/10 rounded-t-md md:top-0 md:py-1 md:right-[-50px] md:rounded-tl-none md:rounded-r-md'>
        <FaTrash 
            size={32}
            className='cursor-pointer rounded transition-all hover:bg-gray-50/5 p-2 z-40 '
            onClick={() => deleteCategory(docId)}
        />
      </div>
    </div>
  )
}

export default CategoryCard