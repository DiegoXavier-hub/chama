import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Fire from '../../assets/images/flame.jpg'
import '../../assets/sass/signUp.css'

export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    return (
        <div id="SignUp">
            <div className="container">
                <img src={Fire} alt="fireImage"/>
                <form>
                    <h1>Join Us</h1>
                    <h2>Welcome it's nice to see you here!</h2>

                    <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required/><span className='email-console'>&nbsp;</span>

                    <input type="text" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                    <span className='email-console'>&nbsp;</span>

                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
                    required/>
                    <span className='password-console'>&nbsp;</span>

                    <button type='submit'>Sign In</button>
                    <div className='register-link-text'>Already a member?<Link to='/signIn' className='register-link'> Sign in</Link></div>
                </form>
            </div>
        </div>
    );
}