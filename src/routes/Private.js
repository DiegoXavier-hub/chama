import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function Private({ children }) {
    const navigate = useNavigate();
    const { signed } = useContext(AuthContext);

    useEffect(() => {
        if (signed) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, [signed, navigate]);

    return children;
}
