'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";

const AuthContext = createContext({});

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser( user ? user : null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}