const API_KEY = '18400523ea991700fb29446902667740';


const requests = {
        fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
        fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
        fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
        fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
        fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
        fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
        fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
        fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
        fetchAnime: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
}

export default requests;