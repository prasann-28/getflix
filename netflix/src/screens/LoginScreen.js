import React, {useState} from 'react'
import "./LoginScreen.css"
import SignupScreen from "./SignupScreen"
// import db from '../components/fbase';
// import {collection, getDocs} from "firebase/firestore";
import logo from '../images/netflix-logo.png'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const [register, setRegister] = useState(false);
    // const [users, setUsers] = useState([]);
    // const usersCollectionRef = collection(db, 'users');

    // useEffect( () => {
    //     const getUsers = async () => {
    //         const data = await getDocs(usersCollectionRef)
    //         if(data){
    //             setUsers(data?.docs.map((doc) => ({...doc?.data(), id: doc?.id})))
    //             console.log(users)
    //         }
    //     }

    //     getUsers()
    // }, [])

    const signInFunc = () => {
        // eslint-disable-next-line no-unused-expressions
        register?setRegister(false):null
        setSignIn(true)
    }

    const registerFunc = () => {
        // eslint-disable-next-line no-unused-expressions
        signIn?setSignIn(false):null
        setRegister(true)
    }

    return (
        // <userList></userList>
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img className="loginScreen__logo" src={logo} alt="" />
                <div className='loginScreen__button_div'>
                <button onClick={registerFunc} className="loginScreen__button">
                    Register
                </button>
                <button onClick={signInFunc} className="loginScreen__button">
                    Sign in
                </button>
                </div>
                <div className="loginScreen__gradient1" />
                </div>

                <div className="loginScreen__body">
                    {signIn? (

                        <SignupScreen logIn={true}/>
                    ):
                    register?(<SignupScreen logIn={false}/>):
                    (
                        <>
                    <h1>Unlimited films, TV Programmes and more... </h1>
                    <h2>Watch anytime, anywhere. Cancel anytime</h2>
                    <h3>Ready to watch? Enter your email to create or renew your membership.</h3>
                    <div className="loginScreen__input_container">
                        <form>
                            <input type="email" 
                            className="loginScreen__input"
                            placeholder="Enter your email"
                            />
                            <button
                            onClick = {() => {setSignIn(true)}}
                             className="loginScreen__getStarted">
                                GET STARTED
                            </button>
                            {/* <div>
                    {users.map((user) => {
                        console.log(users)
                        return <div>
                            {user.email}
                        </div>
                    })}
                </div> */}
                        </form>
                    </div>
                    </>
                    )}
                </div>
            
        </div>
    )
}

export default LoginScreen
