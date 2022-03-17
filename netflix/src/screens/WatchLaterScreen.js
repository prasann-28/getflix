import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
// import './HomeScreen.css'
import Banner from '../components/Banner'
import requests from '../components/Requests'
import Row from '../components/Row'
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs } from 'firebase/firestore'
import db from '../components/fbase'
// import { set } from 'immer/dist/internal'
import './WatchLaterScreen.css'

function WatchLaterScreen() {

    const [movies,setMovies] = useState([])
    const [playerVisible, setPlayerVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const auth =  getAuth()
    const base_url = "https://image.tmdb.org/t/p/original/";
    
    useEffect(() =>{
      async function fetchWatchList(){
        const docRef = doc(db, "users", auth.currentUser.email);
        const currentUserDoc = await getDoc(docRef)
        const currentUserMovies = currentUserDoc.data().watchLaterList
        setMovies(currentUserMovies)
        
        !selectedMovie? setSelectedMovie(currentUserMovies[0]) : null
        
      }
          fetchWatchList();
  },[auth.currentUser.email, movies, selectedMovie]);
    
  const toggleSelection = (movie) => {
    setSelectedMovie(movie)
}

    return (
        <div className='full-div'>
        <Nav />
            <Banner selectedMovie={selectedMovie} setPlayerVisible={setPlayerVisible} playerVisible={playerVisible} />        
       <div className="movies">           
            <div className="movies__posters">

            {movies.map(
                (movie) => (  
                (movie.backdrop_path) && (
                    <img 
                    key={movie.id}
                    className={`movies__poster`}
                    src={`${base_url}${
                        movie.poster_path
                    }`} alt={movie.name} 
                    onClick = {() => toggleSelection(movie)}
                    />
                    
                    
                )))}

            </div>
            
        </div>
        </div>
        
        
    )
}

export default WatchLaterScreen;
