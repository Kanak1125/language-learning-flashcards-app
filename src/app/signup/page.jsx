'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import signUp from '@/firebase/auth/signup'
// import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedPublicRoute from '@/components/ProtectedPublicRoutes'

const page = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const router = useRouter();

  // console.log(currentUser);
  async function handleForm(e) {
    e.preventDefault();
    setError("");

    if ( passwordRef.current.value !== confirmPasswordRef.current.value ) {
      setError("Passwords don't match each other");
      return;
    }
    
    const { result, err } = await signUp(emailRef.current.value, passwordRef.current.value);
    
    if (err) {
      setError("The account already exists.");
    } else {
      console.log(result);
      return router.push("/");
    }
  }

  return (
    <ProtectedPublicRoute>
      <div className='min-h-screen flex flex-col items-center justify-center p-2'>
        <form 
          onSubmit={handleForm}
          className='flex flex-col  w-[80%] max-w-[444px] mx-auto px-4 rounded  backdrop-blur-sm text-white border-2 border-white/25'
        >
          {error &&
            <div className='bg-red-100 border-2 border-red-400 text-red-400 mt-2 p-3 rounded'>
              {error}
            </div>
          }
          <h2 className='text-center text-2xl font-semibold my-6'>Sign Up</h2>
          <label htmlFor="email">Email: </label>
          <input 
            type="email"
            ref={emailRef}
            id="email" 
            placeholder='example@mail.com'
            className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300 focus:bg-white/5 '
            required
          />
          <label htmlFor="password">Password: </label>
          <input 
            type="password"
            ref={passwordRef} 
            id='password' 
            className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300 focus:bg-white/5'
            required
          />
          <label htmlFor="c_password">Confirm Password: </label>
          <input 
            type="password"
            ref={confirmPasswordRef} 
            id="c_password"
            className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300 focus:bg-white/5'
            required
          />
          <input type="submit" value={"Sign Up"} className='mb-4 bg-white hover:bg-gray-50 text-black py-2 rounded transition cursor-pointer mt-1 '/>
          <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link>
        </form>
        <div className='mt-5 text-white/25'>
          Already have an account? 
          <Link href={'/login'} className='text-white ml-2 underline'>Log In</Link>
        </div>
      </div>
    </ProtectedPublicRoute>
  )
}

export default page