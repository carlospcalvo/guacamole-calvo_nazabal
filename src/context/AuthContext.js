import React, {useContext, useState, useEffect} from 'react'
import firebase from 'firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    const logout = () => firebase.auth().signOut()

    const resetPassword = (email) => firebase.auth().sendPasswordResetEmail(email)

    useEffect(() => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => { 
            setCurrentUser(user)
            setLoading(false)
        }) 

        return unsuscribe
    }, []);

    const value = {
        currentUser,
        signUp, 
        login,
        logout,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

