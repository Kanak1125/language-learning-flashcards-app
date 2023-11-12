'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link';
import resetPassword from '@/firebase/auth/resetPassword';
import ProtectedPublicRoute from '@/components/ProtectedPublicRoutes';

const page = () => {
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const emailRef = useRef();

  async function handleForm(e) {
    e.preventDefault();

    setMsg("");
    setIsSuccess(false);
    const { err } = await resetPassword(emailRef.current.value);

    if (err) {
      console.log("I'm running...");
      setMsg("Failed to send mail. Try again!");
      return;
    } 

    setIsSuccess(true);
    setMsg("Please check your email");
  }
  return (
    <ProtectedPublicRoute>
      <div className='min-h-screen flex flex-col items-center justify-center p-2'>
      <form onSubmit={handleForm} className='flex flex-col w-[80%] max-w-[444px] mx-auto px-4 rounded backdrop-blur-sm text-white border-2 border-white/25'>
        {msg &&
          <div className={`${
            isSuccess ? 'bg-green-100 border-green-400 text-green-400 ' :
            'bg-red-100 border-red-400 text-red-400 '
          } border-2 mt-2 p-3 rounded`}>
            {msg}
          </div>
        }
        <h2 className='text-center text-2xl font-semibold my-6'>Reset your password</h2>
        <label htmlFor="email">Email: </label>
        <input 
          type="email" 
          id='email'
          ref={emailRef} 
          className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300 focus:bg-white/5'
          placeholder='someone@example.com'
          required
        />
        <input type="submit" value={"Send mail"} className='mb-4 bg-white hover:bg-gray-50 text-black py-2 rounded transition cursor-pointer mt-1'/>
      </form>
      <div className='mt-5 text-white/25'>
        Back to 
        <Link href={'/login'} className='text-white ml-2 underline'>Log In</Link>
      </div>
      </div>
    </ProtectedPublicRoute>
  )
}

export default page