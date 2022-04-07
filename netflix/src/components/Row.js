import React, {useState, useEffect} from 'react'
import axios from './axios'
import "./Row.css"
import "./Banner.css"


function Row({ title, fetchUrl, isLargeRow = false, setSelectedMovie, selectedMovie }) {

    const [movies, setMovies] = useState([]);
    // const [selectedMovie,setSelectedMovie] = useState(null)

    const base_url = "https://image.tmdb.org/t/p/original/";

    const toggleSelection = async (movie) => {
        
         
        // window.alert(selectedMovie.name)
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
                    className={`row__poster ${isLargeRow? "row__posterLarge":''}`}
                    src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`} alt={movie.title} 
                    onClick = {() => setSelectedMovie(movie)}
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
