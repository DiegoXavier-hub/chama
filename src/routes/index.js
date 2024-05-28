import { Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Profile from '../pages/Profile'
import Dashboard from '../pages/Dashboard'

import Private from './Private'
export default function RoutesApp() {
    return(
        <Routes>
            <Route path="/" element={<Private>  <SignIn /> </Private> } />
            <Route path="/signIn" element={<Private>  <SignIn /> </Private> } />
            <Route path="/signUp" element={ <Private> <SignUp /> </Private> } />
            <Route path="/dashboard" element={ <Private> <Dashboard /> </Private> }/> 
            <Route path="/profile" element={<Private> <Profile/> </Private>}/>
        </Routes>
    )
}