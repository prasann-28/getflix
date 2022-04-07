import React, { useState, useEffect } from 'react'
import './Banner.css'
import axios from './axios'
import requests from './Requests'
import ReactPlayer from 'react-player'
import db from '../components/fbase';
import { increment, updateDoc} from "firebase/firestore";
import { doc, setDoc, arrayUnion } from "firebase/firestore";


import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


function Banner({selectedMovie, setPlayerVisible, playerVisible}) {

    const [movie, setMovie] = useState([]);
    const auth = getAuth()
    const navigate = useNavigate();



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
        
        // eslint-disable-next-line no-unused-expressions
        selectedMovie?setMovie(selectedMovie):fetchData();

    },[ selectedMovie]);
    

    function truncateOverview(str,n) {
        return str?.length > n ? str.substr(0, n-1) + '...': str
    }
    const playMovie = async () => {
       
        await setDoc(doc(db,'movies', movie.name || movie.title), {
            timesPlayed: increment(1)
        },{merge: true})
        await updateDoc(doc(db, 'users', auth.currentUser.email ), {
            timeWatched: increment(1),
            moviesPlayed: arrayUnion(movie)
        })
        setPlayerVisible(true)
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
                    {window.location.pathname === '/' ? <button className="banner__button" onClick={addToList}>Watch Later</button>: <></>}
                    {window.location.pathname === '/' ? <button className="banner__button my__list" onClick={() => navigate('/watchlist')}>My List</button>: <></>}
                    
                </div>
                <h1 className="banner__description">{truncateOverview(movie?.overview,300)}</h1>

            </div>

            <div className="banner--fadeBottom"></div>
            
        </header>
    )
}

export default Banner
