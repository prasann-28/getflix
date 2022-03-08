import React, {useState, useEffect} from 'react'
import "./LoginScreen.css"
import SignupScreen from "./SignupScreen"
import db from '../components/fbase';
import {collection, getDocs} from "firebase/firestore";

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, 'users');

    useEffect( () => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            if(data){
                setUsers(data?.docs.map((doc) => ({...doc?.data(), id: doc?.id})))
            }
        }

        getUsers()
    }, [])

    return (
        // <userList></userList>
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
                <button onClick={() => setSignIn(true)} className="loginScreen__button">
                    Sign in
                </button>
                
                <div className="loginScreen__gradient1" />
                </div>

                <div className="loginScreen__body">
                    {signIn? (
                        <SignupScreen/>
                    ):
                    (
                        <>
                    <h1>Unlimited films, TV Programmes and more... </h1>
                    <h2>Watch anytime, anywhere. Cancel anytime</h2>
                    <h3>Ready to watch? Enter your email to create or renew your membership.</h3>
                    <div className="loginScreen__input">
                        <form>
                            <input type="email" 
                            className=""
                            placeholder="Enter your email"
                            />
                            <button
                            onClick = {() => {setSignIn(true)}}
                             className="loginScreen__getStarted">
                                GET STARTED
                            </button>
                            <div>
                    {users.map((user) => {
                        return <div>
                            {user.email}
                        </div>
                    })}
                </div>
                        </form>
                    </div>
                    </>
                    )}
                </div>
            
        </div>
    )
}

export default LoginScreen
