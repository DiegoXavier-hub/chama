import React from 'react';
import '../../assets/sass/profile.css';
import Title from '../../components/Title/index.js';
import { FiSettings } from 'react-icons/fi'

export default function Profile(){
    return(
        <main id="Profile">
            <Title name='Minha Conta'>
                <FiSettings size={22}/>
            </Title> 
            <h1>Profile</h1>
        </main>
    )
}