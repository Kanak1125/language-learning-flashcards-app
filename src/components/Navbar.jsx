import React, { useState } from 'react'
import { useAuthContext } from "@/contexts/AuthContext"
import logOut from '@/firebase/auth/signout';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [error, setError] = useState("");
    const { currentUser } = useAuthContext();
    const router = useRouter();
  
    function logout() {
        const { err } = logOut();

        if (err) {
            setError("Failed to log out");
            return;
        }

        console.log("Logout successful");
        router.push('/login');
    }
    return (
        <header className='flex justify-between items-center p-4 shadow-md'>
            {error &&
                <div className='bg-red-100 border-2 border-red-400 text-red-400 mt-2 p-3 rounded absolute top-2 left-[50%] translate-x-[-50%] min-w-[200px] text-center'>
                    {error}
                </div>
            }
            <h2> {currentUser ? `WELCOME, ${currentUser.email.split('@')[0].toUpperCase()}` : ""} </h2>
            <button onClick={logout} className='cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-white p-2 rounded transition'>
                Log Out
            </button>
        </header>
    )
}

export default Navbar