import React, { useState } from 'react'
import Nav from '../components/Nav'
import './HomeScreen.css'
import Banner from '../components/Banner'
import requests from '../components/Requests'
import Row from '../components/Row'
import { getAuth } from "firebase/auth";


function HomeScreen() {

    const [selectedMovie,setSelectedMovie] = useState(null)
    const [playerVisible, setPlayerVisible] = useState(false);
    const auth =  getAuth()
    // console.log(auth.currentUser.email)
    

    return (
        !auth.currentUser.emailVerified ? <div className="profileScreen"> <h1 className='verify-message'>Please verify using the email in your inbox</h1>
        <h2 className='verify-messageh2'>If done already, <u onClick={() => window.location.reload()}>click here</u></h2></div>
        :
        <div className="homeScreen">
           <Nav />
            <Banner selectedMovie={selectedMovie} setPlayerVisible={setPlayerVisible} playerVisible={playerVisible} />

            <Row 
            title="Netflix Originals"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
            setSelectedMovie={setSelectedMovie}
            selectedMovie = {selectedMovie}
            
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} setSelectedMovie={setSelectedMovie} selectedMovie = {selectedMovie}/>
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} setSelectedMovie={setSelectedMovie}  selectedMovie = {selectedMovie}/>
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} setSelectedMovie={setSelectedMovie}  selectedMovie = {selectedMovie}/>
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} setSelectedMovie={setSelectedMovie}  selectedMovie = {selectedMovie}/>
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} setSelectedMovie={setSelectedMovie}  selectedMovie = {selectedMovie}/>
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} setSelectedMovie={setSelectedMovie}  selectedMovie = {selectedMovie}/>
            <Row title="Animation" fetchUrl={requests.fetchAnime} setSelectedMovie={setSelectedMovie}  selectedMovie = {selectedMovie}/>

        </div>
    )
}

export default HomeScreen;
