import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';

// creat react Context API and export this context api. api hoks always call top
export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // sign in with google by popup
    const providerLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    // signUp..and submit
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // updateProfile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    // email verification
    const verificationEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    // login 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // signout 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // call by useeffect 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user inside sate change', currentUser);
            
            if (currentUser === null || currentUser.emailVerified) {
                setUser(currentUser);
            }
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        providerLogin,
        updateUserProfile,
        verificationEmail,
        logOut,
        createUser,
        signIn
    }

    return (
        <div>
            {/* set provider  */}
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;