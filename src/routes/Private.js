import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function Private({ children }) {
    const navigate = useNavigate();
    const { signed } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (!signed && (location.pathname === '/signIn' || location.pathname === '/')) {
            navigate('/');
        } else if(!signed && (location.pathname === '/signUp')){
            navigate('/signUp');
        } else {
            if (location.pathname === '/' || location.pathname === '/signIn' || location.pathname === '/signUp') {
                navigate('/dashboard');
            }
        }
    }, [signed, navigate, location.pathname]);

    return children;
}
