import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Fire from '../../assets/images/fire.jpg'

export default function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="SignIn">
            <div className="container">
                <img src={Fire} alt="fireImage"/>
                <form>
                    <h1>Hello Again!</h1>
                    <span>Welcome back you've been missed!</span>

                    <input type="text" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>

                    <a href='/'>Recovery Password</a>
                    <button type='submit'>Sign In</button>
                </form>
                    <div>Not a member?<Link to='/signUp'> Register now</Link></div>
            </div>
        </div>
    );
}