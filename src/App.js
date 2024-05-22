import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './routes'
import AuthProvider from './contexts/auth.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/index.js';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <ToastContainer autoClose={2500}/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
