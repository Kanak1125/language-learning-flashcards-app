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
        <header className='p-4 shadow-md bg-[#0a0a0a]'>
            {error &&
                <div className='bg-red-100 border-2 border-red-400 text-red-400 mt-2 p-3 rounded absolute top-2 left-[50%] translate-x-[-50%] min-w-[200px] text-center'>
                    {error}
                </div>
            }
            {/* nav bar txt color: #8e8e8e */}
            <div className="container flex justify-between items-center mx-auto">
                <h2 className='text-[#8e8e8e]'> {currentUser ? `WELCOME, ${currentUser.email.split('@')[0].toUpperCase()}` : ""} </h2>
                <button onClick={logout} className='cursor-pointer bg-white hover:bg-gray-50 p-2 text-black rounded transition'>
                    Log Out
                </button>
            </div>
        </header>
    )
}

export default Navbar