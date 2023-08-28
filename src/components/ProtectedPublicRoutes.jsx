import React from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';

const ProtectedPublicRoute = ({ children }) => {
    const { currentUser } = useAuthContext();
    const router = useRouter();

    if (currentUser) {
        return router.push('/');
    }

    return (
        <>
            { children }
        </>
    )
}

export default ProtectedPublicRoute