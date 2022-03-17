import React, { useState, useEffect }from 'react';
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";
import './App.css';
import { auth } from './components/fbase';
import {useDispatch, useSelector } from 'react-redux'
import {login,logout, selectUser} from './features/userSlice'
import WatchLaterScreen from './screens/WatchLaterScreen'

function App() {
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
      
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,

        }))
      }else{
        //Logged out
        dispatch(logout())
      }
    })
    return unsubscribe; 
    
  },[dispatch])

  return (
    
    <div className="app">
     
    <Router>
      {!user? (
        <LoginScreen />
      ):(
        <Routes>
        <Route exact path="/" element={<HomeScreen/>} />
        <Route exact path="/profile" element={<ProfileScreen/>} />
        <Route exact path="/watchlist" element={<WatchLaterScreen/>} />
      </Routes>
      )}
    </Router>
    </div>
  );
}

export default App;
