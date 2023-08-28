import React from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuthContext();
    const router = useRouter();

    if (!currentUser) {
        return router.push('/login');
    }

    return (
        <>
            { children }
        </>
    )
}

export default ProtectedRoute