import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/auth';

import Fire from '../../assets/images/flame.jpg'
import '../../assets/sass/signUp.css'

export default function SignIn() {

    const { signUp, loadingAuth } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(e){
        e.preventDefault()

        let redirect = true
        
        if(name.length < 3) {
            document.getElementById('name').style.border = '1px solid red'
            document.getElementById('nameConsole').innerText = 'Name must be at least 3 characters long'
            redirect = false
        } else{
            document.getElementById('nameConsole').innerText = ' '
            document.getElementById('name').style.border = 'none'
        }

        if(!email.includes('@') || !email.includes('.') || email.length <= 9) {
            document.getElementById('email').style.border = '1px solid red'
            document.getElementById('emailConsole').innerText = 'Please enter a valid email address'
            redirect = false
        } else {
            document.getElementById('emailConsole').innerText = ' '
            document.getElementById('email').style.border = 'none'
        }

        if(password.length < 8) {
            document.getElementById('password').style.border = '1px solid red'
            document.getElementById('passwordConsole').innerText = 'Password must be at least 8 characters long'
            redirect = false
        } else {
            document.getElementById('passwordConsole').innerText = ' '
            document.getElementById('password').style.border = 'none'
        }

        if(redirect){
            await signUp(name, email, password)
        }
    }

    return (
        <div id="SignUp">
            <div className="container">
                <img src={Fire} alt="fireImage"/>
                <form onSubmit={ handleSubmit }>
                    <h1>Join Us</h1>
                    <h2>Welcome it's nice to see you here!</h2>

                    <input id='name' type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required/><span id='nameConsole' className='email-console'>&nbsp;</span>

                    <input id='email' type="text" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                    <span id='emailConsole' className='email-console'>&nbsp;</span>

                    <input id='password' type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
                    required/>
                    <span id='passwordConsole' className='password-console'>&nbsp;</span>

                    <button type='submit'>
                        {loadingAuth ? <div class="loader"></div> : 'Sign Up'}
                    </button>
                    <div className='register-link-text'>Already a member?<Link to='/signIn' className='register-link'> Sign in</Link></div>
                </form>
            </div>
        </div>
    );
}