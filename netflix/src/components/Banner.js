import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from './axios'
import requests from './Requests'
import ReactPlayer from 'react-player'
import db from '../components/fbase';
import {collection, getDocs, increment, updateDoc} from "firebase/firestore";
import { doc, setDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";

import {serverStamp} from "../components/fbase"
import { getAuth } from "firebase/auth";


function Banner({selectedMovie, setPlayerVisible, playerVisible}) {

    const [movie, setMovie] = useState([]);
    const auth = getAuth()
    const userRef = doc(db, "users", auth.currentUser.email);
    

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1 )
                ]
            );
            return request;
        }

        selectedMovie?setMovie(selectedMovie):fetchData();
    }, [selectedMovie]);
    

    const playMovie = async () => {
        const currentUserDetails = await getDoc(userRef);
        setPlayerVisible(true)
        setDoc(doc(db,'movies', movie.name), {
            timesPlayed: increment(1)
        },{merge: true})
        updateDoc(doc(db, 'users', auth.currentUser.email ), {
            timeWatched: increment(1),
            moviesPlayed: arrayUnion(movie)
        })
    }

    const addToList = async () => {

        await updateDoc(doc(db, 'users', auth.currentUser.email ), {
            watchLaterList: arrayUnion(movie)
        })
        window.alert("Added")
    }


    return (

        playerVisible? <div className='video-player'><ReactPlayer className='react_player' url='https://www.youtube.com/watch?v=EU6I8TxU6Z4' controls playing pip ></ReactPlayer>
        <button onClick={() => setPlayerVisible(false)} className='close-button'><img  className='close-logo' src='https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=close' alt='Close button' /></button>        
        </div>
        :
        <header className="banner" style={{backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        objectFit: 'contain',
    }}>

            <div className="banner__contents">
                <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button" onClick={playMovie}>Play</button>
                    <button className="banner__button" onClick={addToList}>My List</button>
                </div>
                <h1 className="banner__description">{movie?.overview}</h1>
            </div>

            <div className="banner--fadeBottom"></div>
            
        </header>
    )
}

export default Banner
