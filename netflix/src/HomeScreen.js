import React from 'react'
import Nav from './Nav'
import './HomeScreen.css'
import Banner from './Banner'
import requests from './Requests'
import Row from './Row'

function HomeScreen() {

    console.log('FetchOriginal')
    console.log(requests.fetchNetflixOriginals)
    return (
        <div className="homeScreen">
           <Nav />
            <Banner />

            <Row 
            title="Netflix Originals"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

        </div>
    )
}

export default HomeScreen;
