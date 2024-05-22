import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import '../../assets/sass/dashboard.css'
export default function Dashboard(){

    const { logOut } = useContext(AuthContext)

    return(
        <main id='Dashboard'>
            <h1>
                Dashboard
            </h1>
            <button type='button' onClick={()=>logOut(false)}> Logout </button>
        </main>
    )
}