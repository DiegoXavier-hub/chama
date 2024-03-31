import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Fire from '../../assets/images/fire.jpg'
import '../../assets/sass/signIn.css'

export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div id="SignIn">
            <div className="container">
                <img src={Fire} alt="fireImage"/>
                <form>
                    <h1>Hello Again!</h1>
                    <h2>Welcome back you've been missed!</h2>

                    <input type="text" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                    <span className='email-console'>&nbsp;</span>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
                    required/>
                    <span className='password-console'>&nbsp;</span>

                    <Link to='/' className='recovery-password'>Recovery Password</Link>
                    <button type='submit'>Sign In</button>
                    <div className='register-link-text'>Not a member?<Link to='/signUp' className='register-link'> Register now</Link></div>
                </form>
            </div>
        </div>
    );
}