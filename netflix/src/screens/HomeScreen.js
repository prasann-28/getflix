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
    console.log(auth.currentUser.email)
    

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
            playerVisible={playerVisible}
            setPlayerVisible={setPlayerVisible}
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} setSelectedMovie={setSelectedMovie} setPlayerVisible={setPlayerVisible}/>
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} setSelectedMovie={setSelectedMovie} setPlayerVisible={setPlayerVisible} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} setSelectedMovie={setSelectedMovie} setPlayerVisible={setPlayerVisible} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} setSelectedMovie={setSelectedMovie} setPlayerVisible={setPlayerVisible} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} setSelectedMovie={setSelectedMovie} setPlayerVisible={setPlayerVisible} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} setSelectedMovie={setSelectedMovie} setPlayerVisible={setPlayerVisible} />

        </div>
    )
}

export default HomeScreen;
