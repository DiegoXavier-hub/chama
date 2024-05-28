import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect, useState } from'react'
import RoutesApp from './routes'
import AuthProvider from './contexts/auth.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/index.js';

export default function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent(){
  const location = useLocation()
  const [showHeader, setShowHeader] = useState()

  useEffect(()=>{
    if(location.pathname === '/' || location.pathname === '/signIn' || location.pathname === '/signUp'){
      setShowHeader(false)
    }else{
      setShowHeader(true)
    }
  }, [location])

  return(
    <>
      {showHeader && <Header />}
      <ToastContainer autoClose={2500} />
      <RoutesApp />
    </>
  )
}
