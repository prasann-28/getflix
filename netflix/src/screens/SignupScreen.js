import React, {useRef} from 'react'
import { auth } from '../components/fbase';
import './SignupScreen.css'
import db from '../components/fbase'
import { doc, setDoc } from "firebase/firestore";
import {serverStamp} from "../components/fbase"

function SignupScreen() {
     
    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value).then( async (authUser) => {
                // console.log(authUser)
                // window.alert(authUser.user.emailVerified) 
                authUser.user.sendEmailVerification().then( async () =>{
                    window.alert('Email is sent, please check inbox.')
                    
                    await setDoc(doc(db, "users", authUser.user.email), {
                    //    add things to firestore
                        email: authUser.user.email,
                        plans: 'basic',
                        lastLogin: serverStamp.now(),
                        timeWatched: 0,
                        watchLaterList: [],
                      },{ merge: true });
            }).catch((error) =>{
                alert(error.message)
            })                
            }).catch((error) => {
                alert(error.message);
            })

        

    };

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then( async (authUser) => {
            console.log(authUser); 
            
            await setDoc(doc(db, "users", authUser.user.email), {
                //    add things to firestore
                    lastLogin: serverStamp.now()
                  },{ merge: true });
    }).catch((error) => {
        alert(error.message);
    })

    }


    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <br/>
                <input ref={emailRef} placeholder="Enter you email." type="email"/>
                <input ref={passwordRef} placeholder="Password." type="password"/>
                <button onClick={signIn} type="submit">Submit</button>
                <h4 className="signupScreen__h4"> 
                    <span className="signupScreen__gray">
                    New to Netflix? </span>
                    <span onClick={register}  className="signupScreen__link">
                    Sign Up Now</span>
                    </h4>
            </form>
        </div>
    )
}

export default SignupScreen
