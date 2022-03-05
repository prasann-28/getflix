import React from 'react'
import './Watch.css'
function  Watch({movie}) {
  return (
      <>
       <header className="banner" style={{backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        objectFit: 'contain',
    }}>

            <div className="banner__contents">
                <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{movie?.overview}</h1>
            </div>

            <div className="banner--fadeBottom"></div>
            
        </header>
      </>
  )
}

export default Watch