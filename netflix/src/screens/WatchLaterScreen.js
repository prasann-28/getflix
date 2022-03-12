import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import './HomeScreen.css'
import Banner from '../components/Banner'
import requests from '../components/Requests'
import Row from '../components/Row'
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs } from 'firebase/firestore'
import db from '../components/fbase'
// import { set } from 'immer/dist/internal'


function WatchLaterScreen() {

    const [movies,setMovies] = useState([])
    const [playerVisible, setPlayerVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const auth =  getAuth()
    const base_url = "https://image.tmdb.org/t/p/original/";
    // console.log(auth.currentUser.email)
    
    // const getWatchList = async () => {
    //   const currentUser = await 
    // }
    useEffect(() =>{
      async function fetchWatchList(){
        const docRef = doc(db, "users", auth.currentUser.email);
        const currentUserDoc = await getDoc(docRef)
        const currentUserMovies = currentUserDoc.data().watchLaterList
        setMovies(currentUserMovies)
        setSelectedMovie(currentUserMovies[0])
        
      }
          fetchWatchList();
  },[auth.currentUser.email, movies, selectedMovie]);
    
  const toggleSelection = (movie) => {
    setSelectedMovie(movie)
}

    return (
        <>
        <Nav />
            <Banner selectedMovie={selectedMovie} setPlayerVisible={setPlayerVisible} playerVisible={playerVisible} />        
       <div className="row">           
            <div className="row__posters">

            {movies.map(
                (movie) => (  
                (movie.backdrop_path) && (
                    <img 
                    key={movie.id}
                    className={`row__poster`}
                    src={`${base_url}${
                        movie.backdrop_path
                    }`} alt={movie.name} 
                    onClick = {() => toggleSelection(movie)}
                    />
                    
                    
                //     <div className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                //     style={{
                //     backgroundImage: "url(`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`)", 
                //     backgroundSize: '100%',
                //     backgroundPosition: 'center center',
                //     objectFit: 'contain',
                // }}>
                //     <button className='row__button'>Play</button>
                // </div>
                    
                )))}

            </div>
        </div>
        </>
        
        
    )
}

export default WatchLaterScreen;
