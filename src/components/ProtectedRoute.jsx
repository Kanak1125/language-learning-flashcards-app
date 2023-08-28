import React from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuthContext();
    const router = useRouter();

    if (!currentUser) {
        router.push('/login');
        return <h1> Loading... </h1>
    }

    return (
        <>
            { children }
        </>
    )
}

export default ProtectedRoute