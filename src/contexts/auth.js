import { useState, createContext, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext({})

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    function signIn(email, password){
        setLoadingAuth(true)
    }

    async function signUp(name, email, password){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, 'users', uid), {
                name: name,
                avatarUrl: null,
            })
            .then( () => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null,
                }

                setUser(data)
                setLoadingAuth(false)
            })
        })
        .catch((error)=>{
            switch(error.code){
                case 'auth/weak-password':
                    document.getElementById('password').style.border = '1px solid red'
                    document.getElementById('passwordConsole').innerText = 'Weak password, must be at least 8 characters long'
                    break;
                case 'auth/invalid-email':
                    document.getElementById('email').style.border = '1px solid red'
                    document.getElementById('emailConsole').innerText = 'Invalid email'
                    break;
                case 'auth/email-already-in-use':
                    document.getElementById('email').style.border = '1px solid red'
                    document.getElementById('emailConsole').innerText = 'Email already in use'
                    break;
                default:
                    document.getElementById('password').style.border = '1px solid red'
                    document.getElementById('passwordConsole').innerText = 'Something went wrong, try again later'
                    break;
            }
        })
    }

    return(
        <AuthContext.Provider 
        value={{
            signed: !!user, // !! coverte para boolean, se conter algum dado é convertido para true, assim é possível verificar se há um usuário logado
            user,
            signIn,
            signUp,
            loadingAuth,
            user
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}