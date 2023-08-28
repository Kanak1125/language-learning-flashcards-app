import React, { useState } from 'react'
import { useAuthContext } from "@/contexts/AuthContext"
import logOut from '@/firebase/auth/signout';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [error, setError] = useState("");
    const { currentUser } = useAuthContext();
    const router = useRouter();
  
    function logout() {
        const { result, err } = logOut();

        if (err) {
            setError("Failed to log out");
            return;
        }

        console.log("Logout successful");
        router.push('/login');
    }
    return (
        <header className='flex justify-between items-center p-2'>
            <h2> {currentUser ? currentUser.email : ""} </h2>
            <div onClick={logout} className='cursor-pointer'>
                Log Out
            </div>
        </header>
    )
}

export default Navbar