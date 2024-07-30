const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTZhNDZjYzY0ZTA1YzJmMTc0YTc3NTNlZWVhNGRkMCIsIm5iZiI6MTcyMTc4NDkzNS44MTcxNTQsInN1YiI6IjY2YTA1OGUxYTY3YWI5YzZiZDM4MDk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Plzn_w4QFWnCJdyueRsXB_4TKnIrAL5grMj-QnWhhMQ'
  }
};

export const fetchMovieImages = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/images`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie images:', error);
    throw error;
  }
};

export const fetchMovies = async (userMovieSearch) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?query=${userMovieSearch}&include_adult=false&language=en-US&page=1`, options)
    const data = await response.json()
    return data
  } catch (error){
    console.error('Error searching for movies: ', error)
    throw error
  }
}

export { BASE_IMAGE_URL };



/// issue one, 
// once you pick a title, it appears in the search box but then appears underneath it aswell


// issue two, 
// if there are multiple titles with the same name at the begginning and you click one, that title is populated in the search bar but the other titles appear below the search box aswell 