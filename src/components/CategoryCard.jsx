import React from 'react'
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

const CategoryCard = (props) => {
    const {docId, docData} = props;
    const {name, language} = docData;

    function deleteCategory(id) {
      console.log(`Deleting category with id: ${id}`);
    }
  return (
    <div className='relative w-100 min-h-20 shadow-lg rounded-md p-3 border-2 border-slate-400 hover:shadow-xl md:max-w-[200px] transition-all group'>
      <Link href={`/category/${docId}`} key={docId}
      className=' '
      >
          <h1>{name}</h1>
          <hr className='border-slate-400 rounded'/>
          <p>{language}</p>
      </Link>
      <div className='__icons absolute right-[-40px] top-0 hidden group-hover:block bg-gray-50/10 '>
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