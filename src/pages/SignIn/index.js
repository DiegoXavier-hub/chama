import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import Fire from '../../assets/images/fire.jpg'
import '../../assets/sass/signIn.css'

export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = useContext(AuthContext)

    function handleLogin(e){
        e.preventDefault()

        let redirect = true

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
            document.getElementById('passwordConsole').innerText = 'Invalid password'
            redirect = false
        } else {
            document.getElementById('passwordConsole').innerText = ' '
            document.getElementById('password').style.border = 'none'
        }

        if(redirect){
            signIn(email, password)
        }
    }

    return (
        <div id="SignIn">
            <div className="container">
                <img src={Fire} alt="fireImage"/>
                <form onSubmit={handleLogin}>
                    <h1>Hello Again!</h1>
                    <h2>Welcome back you've been missed!</h2>

                    <input id='email' type="text" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                    <span id='emailConsole' className='email-console'>&nbsp;</span>

                    <input id='password' type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
                    required/>
                    <span id='passwordConsole' className='password-console'>&nbsp;</span>

                    <Link to='/' className='recovery-password'>Recovery Password</Link>
                    <button type='submit'>Sign In</button>
                    <div className='register-link-text'>Not a member?<Link to='/signUp' className='register-link'> Register now</Link></div>
                </form>
            </div>
        </div>
    );
}