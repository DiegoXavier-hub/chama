import { useState, createContext, useEffect, useCallback } from 'react'
import { auth, db } from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const AuthContext = createContext({})

export default function AuthProvider({ children, ...rest  }){
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true); // new state to handle the initial loading
    

    async function signIn(email, password){
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password).then( async (value)=>{
            let uid = value.user.uid
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                name: docSnap.data().name,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl,
            }

            storageUser(data)
            setLoadingAuth(false)
            navigate('/dashboard')
        }).catch( (error)=>{
            switch(error.code){
                case 'auth/user-not-found':
                    toast.error('User not found"')
                    break;
                case 'auth/invalid-credential':
                    toast.error('Invalid credentials')
                    break;
                default:
                    toast.error('Ops, something went wrong, try again later!')
                    break;
                }
            setLoadingAuth(false)
        })
    }

    async function signUp(name, email, password){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, 'users', uid), {
                name: name,
                avatarUrl: null,
                admin: false,
            })
            .then( () => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null,
                }

                setLoadingAuth(false)
                storageUser(data)
                navigate('/dashboard')
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        .catch((error)=>{
            switch(error.code){
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
            setLoadingAuth(false)
        })
    }

    const logOut = useCallback(async (experied) => {
            await signOut(auth)
            .then(()=>{
                localStorage.removeItem('@ticketsPRO')
                setUser(null)
                !experied ? toast.error('You have been logged out') : toast.info('Session expired')
                navigate('/')
                return true
            })
            .catch((error)=>{
                console.log(error.code)
                return false
            })
    }, [navigate])

    useEffect(() => {
        async function loadStorageData(){
            const storageUser = localStorage.getItem('@ticketsPRO');
            if (storageUser) {
                const parsedUser = JSON.parse(storageUser);
                const currentTime = new Date().getTime();

                if (parsedUser.expirationTime && currentTime > parsedUser.expirationTime) {
                    await signOut(auth)
                    .then(()=>{
                        logOut(true)
                    })
                }

                setUser(parsedUser);
            }
            setLoading(false); // Done loading
        }

        loadStorageData();
    }, [loadingAuth, loading, logOut, navigate])

    function storageUser(data) {
        const expirationTime = new Date().getTime() + 1 * 24 * 60 * 60 * 1000 // 1 dia em milissegundos
        const userData = {
            ...data,
            expirationTime,
        };
        localStorage.setItem('@ticketsPRO', JSON.stringify(userData));
        toast.success(`Bem-vindo(a), ${data.name}!`)
    }

    return(
        <AuthContext.Provider 
        value={{
            signed: !!user, // !! coverte para boolean, se conter algum dado é convertido para true, assim é possível verificar se há um usuário logado
            user,
            signIn,
            signUp,
            loadingAuth,
            setLoadingAuth,
            logOut
        }}
        >   
            {!loading && children}

        </AuthContext.Provider>
    )
}