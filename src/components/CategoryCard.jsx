import React from 'react'
import Link from 'next/link';

const CategoryCard = (props) => {
    const {docId, docData} = props;
    const {name, language} = docData;

  return (
    <Link href={`/category/${docId}`} key={docId}
    className='w-100 min-h-20 shadow-lg rounded-md p-3 border-2 border-slate-400 hover:shadow-xl md:max-w-[200px] transition-all '
    >
        <h1>{name}</h1>
        <hr className='border-slate-400 rounded'/>
        <p>{language}</p>
    </Link>
  )
}

export default CategoryCard