'use client'

import signIn from '@/firebase/auth/signin';
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import ProtectedPublicRoute from '@/components/ProtectedPublicRoutes';

const Page = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  
  async function handleForm(e) {
    e.preventDefault();
    setError("");

    const { result, err } = await signIn(emailRef.current.value, passwordRef.current.value);

    if (err) {
      setError("Couldn't log in");
      return;
    }

    console.log(result.user.uid);
    router.push('/');
  }

  return (
    <ProtectedPublicRoute>
      <div className='min-h-screen flex flex-col items-center justify-center p-2'>
        <form onSubmit={handleForm} className='flex flex-col w-[80%] max-w-[444px] mx-auto px-4 rounded backdrop-blur-sm text-white border-2 border-white/25'>
          {error &&
            <div className='bg-red-100 border-2 border-red-400 text-red-400 mt-2 p-3 rounded'>
              {error}
            </div>
          }
          <h2 className='text-center text-2xl font-semibold my-6'>Log In</h2>
          <label htmlFor="email">Email: </label>
          <input 
            type="email" 
            id='email'
            ref={emailRef} 
            className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300 focus:bg-white/5'
            required
          />
          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            id="password" 
            ref={passwordRef}
            className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300 focus:bg-white/5'
            required
          />
          <input type="submit" value={"Login"} className='mb-4 bg-white hover:bg-gray-50 text-black py-2 rounded transition cursor-pointer mt-1 '/>
          <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link>
        </form>
        <div className='mt-5 text-white/25'>
          Don't have an account? 
          <Link href={'/signup'} className='text-white ml-2 underline'>Sign Up</Link>
        </div>
      </div>
    </ProtectedPublicRoute>
  )
}

export default Page