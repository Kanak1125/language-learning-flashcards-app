import React from 'react'

const MyModal = ({ children }) => {
  return (
    <div className='fixed inset-0 bg-black/60 px-4 flex items-center justify-center backdrop-blur-sm z-40 '>
        { children }
    </div>
  )
}

export default MyModal