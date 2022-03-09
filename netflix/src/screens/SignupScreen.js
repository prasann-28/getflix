import React, {useState,useEffect, useRef} from 'react'
import { auth } from '../components/fbase';
import './SignupScreen.css'
import db from '../components/fbase'
import {collection, getDocs} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

function SignupScreen() {
     
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usersCollectionRef = collection(db, 'users');
    const [users, setUsers] = useState([])

    useEffect( () => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            if(data){
                setUsers(data?.docs.map((doc) => ({...doc?.data(), id: doc?.id})))
                console.log(users)
            }
        }

        getUsers()
    })

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value).then( async (authUser) => {
                // console.log(authUser)
                window.alert(authUser.user.emailVerified) 
                authUser.user.sendEmailVerification().then( async () =>{
                    window.alert('email sent')
                    
                    await setDoc(doc(db, "users", authUser.user.email), {
                    //    add things to firestore
                        hello: 'world. This works'
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
            window.alert("Login successful")
            await setDoc(doc(db, "users", authUser.user.email), {
                //    add things to firestore
                    hello: 'world. This works really'
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
