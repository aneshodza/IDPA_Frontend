import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, onIdTokenChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../base/firebase";

const AuthContext = createContext()


export function useAuth({ children }) {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    auth.onAuthStateChanged((user) => {
        setCurrentUser(user)
        console.log("Userstate Changed")
    })

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signout() {
        return signOut(auth)
    }

    const value = {
        signin,
        signout,
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider >
    )
}