import React, {useState, useEffect, setState} from 'react'
import axios from './axios'
import "./Row.css"
import "./Banner.css"
import Watch from './Watch'

function Row({ title, fetchUrl, isLargeRow = false, setSelectedMovie }) {

    const [movies, setMovies] = useState([]);
    // const [selectedMovie,setSelectedMovie] = useState(null)

    const base_url = "https://image.tmdb.org/t/p/original/";

    const toggleSelection = (movie) => {
        setSelectedMovie(movie)
    }

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(
                request.data.results
            );
            return request;
        }
            fetchData();
    }, [fetchUrl]);

    return (
    
        <div className="row">
            <h2>{title}</h2>
           
            <div className="row__posters">

            {movies.map(
                (movie) => (
                ((isLargeRow && movie.poster_path) || 
                (!isLargeRow && movie.backdrop_path)) && (
                    <img 
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
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
    )
}

export default Row
