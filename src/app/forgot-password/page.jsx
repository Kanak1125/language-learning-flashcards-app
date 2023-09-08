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
      <form onSubmit={handleForm} className='flex flex-col border-2 border-slate-200 w-[80%] max-w-[444px] mx-auto px-4 rounded'>
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
          className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
          placeholder='someone@example.com'
          required
        />
        <input type="submit" value={"Send mail"} className='mb-4 bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded transition cursor-pointer mt-1 hover:bg-slate-'/>
      </form>
      <div className='mt-5'>
        Back to 
        <Link href={'/login'} className='text-cyan-400 ml-2 underline'>Log In</Link>
      </div>
      </div>
    </ProtectedPublicRoute>
  )
}

export default page