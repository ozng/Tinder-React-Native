import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import * as Google from 'expo-google-app-auth';
import { auth } from '../firebase'
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth'

const AuthContext = createContext({})

const config = {
    androidClientId: "111776572481-7jallp4ltg98udj6jqv6difej3plnji3.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"]
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const [loadingInitial, setLoadingInitial] = useState(true)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user, x) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setLoadingInitial(false)
        })

        return unsub;
    }, [auth])

    const signInWithGoogle = async () => {
        setLoading(true)

        await Google.logInAsync(config)
            .then(async (logInResult) => {
                if (logInResult.type === "success") {
                    const { idToken, accessToken } = logInResult;
                    const credantial = GoogleAuthProvider.credential(idToken, accessToken);
                    await signInWithCredential(auth, credantial)
                }
                return Promise.reject();
            }).catch(err => setError(err))
            .finally(() => setLoading(false))
    }

    const logout = () => {
        setLoading(true)

        auth.signOut().catch(err => setError(err)).finally(() => setLoading(false))
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
