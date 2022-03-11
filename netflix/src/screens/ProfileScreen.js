import React from 'react'
import Nav from '../components/Nav'
import {useSelector } from 'react-redux'
import {selectUser} from '../features/userSlice'
import { auth } from '../components/fbase'
import './ProfileScreen.css'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import avatar from '../images/netflix-avatar.png'


function ProfileScreen()  {
    
    const auth =  getAuth()
    console.log(auth.currentUser.email)
    const user = auth.currentUser

    return (
        !auth.currentUser.emailVerified ? <div className="profileScreen"> <h1 className='verify-message'>Please verify using the email in your inbox</h1>
        <h2 className='verify-messageh2'>If done already, <u onClick={() => window.location.reload()}>click here</u></h2></div>
        :
        <div className="profileScreen">
            <Nav/>
            <div className="profileScreen__body">
            <h1>Edit Profile</h1>
            <div className="profileScreen__info">
                <img src={avatar} alt=""></img>
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen__plans">
                        <h3>Plans</h3>
                        <p></p>


                        <button className='reset-text' onClick={() => sendPasswordResetEmail(auth,user.email).then(() => window.alert('emailsent'))}>Reset Password</button>
                        <button onClick={() => auth.signOut()} className="profileScreen__signOut">Sign Out</button>
                    </div>
                </div>
            </div>
            </div>

        </div>
    )
}

export default ProfileScreen
