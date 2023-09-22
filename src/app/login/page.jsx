'use client'

import signIn from '@/firebase/auth/signin';
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import ProtectedPublicRoute from '@/components/ProtectedPublicRoutes';

const page = () => {
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
        <form onSubmit={handleForm} className='flex flex-col border-2 border-slate-200 w-[80%] max-w-[444px] mx-auto px-4 rounded'>
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
            className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
            required
          />
          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            id="password" 
            ref={passwordRef}
            className='mb-5 border-2 border-slate-200 py-1 px-2 mt-1 rounded'
            required
          />
          <input type="submit" value={"Log In"} className='mb-4 bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded transition cursor-pointer mt-1 '/>
          <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-cyan-400'>Forgot Password?</Link>
        </form>
        <div className='mt-5'>
          Don't have an account? 
          <Link href={'/signup'} className='text-cyan-400 ml-2 underline'>Sign Up</Link>
        </div>
      </div>
    </ProtectedPublicRoute>
  )
}

export default page