import { useEffect, useState, useCallback } from "react";
import "./App.css";
import debounce from "lodash/debounce";

import { fetchMovieImages, BASE_IMAGE_URL, fetchMovies } from "./api";
import { movieTitleIdList } from "./moveIdList";
import GuessTracking from "./components/GuessTracking";

function App() {
  const [movieImages, setMovieImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fetchedMovieTitle, setFetchedMovieTitle] = useState([]);
  const [movieTitleSearch, setMovieTitleSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [handleClickBool, setHandleClickBool] = useState(false);
  const [userPressedEnter, setUserPressedEnter] = useState("");

  // this is just a function that when called will get a random number from the array of objs
  const randomMovieId = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // this is mapping the 'id' portion of the movieTitleIdList constants array of objects
  // to a var
  const moveId = movieTitleIdList.map((movie) => movie.id);

  // setting state to random id
  const [randomMovieID, setRandomMovieID] = useState(() =>
    randomMovieId(moveId)
  );

  // this gets the movie id and title pair
  const search = movieTitleIdList.filter((item) => {
    return item.id === randomMovieID;
  });

  // when called this function will generate random id, clear the search results
  const generateNewRandomId = () => {
    setRandomMovieID(randomMovieId(moveId));
    setFetchedMovieTitle([]);
    setMovieTitleSearch("");
  };

  // this is fetches the movie images
  useEffect(() => {
    setIsLoading(true);
    fetchMovieImages(randomMovieID)
      .then((data) => {
        // Limit to 5 images
        if (data.backdrops && data.backdrops.length > 5) {
          data.backdrops = data.backdrops.slice(0, 5);
        }
        setMovieImages(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [randomMovieID]);

  //
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      fetchMovies(searchTerm)
        .then((data) => {
          setFetchedMovieTitle(data.results);
        })
        .catch((error) => console.error("Error:", error));
    }, 300),
    []
  );

  useEffect(() => {
    if (movieTitleSearch) {
      debouncedSearch(movieTitleSearch);
    } else {
      setFetchedMovieTitle([]);
    }
  }, [movieTitleSearch, debouncedSearch]);

  const nextImage = () => {
    if (movieImages && movieImages.backdrops) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % movieImages.backdrops.length
      );
    }
  };

  const prevImage = () => {
    if (movieImages && movieImages.backdrops) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + movieImages.backdrops.length) %
          movieImages.backdrops.length
      );
    }
  };




////////////////////////////////////////////////

// adding an explict game counter for readablilty 
const [gameGuessCounter, setGameGuessCounter] = useState(0)

const [guessTracking, setGuessTracking] = useState({
  guessOne: '',
  guessTwo: '',
  guessThree:'',
  guessFour: '',
  guessFive: ''
})



// const handleTest = ()=>{
//   setGuessTracking(guessOne: 'testing')
//   console.log(guessTracking)
// }


const guessTrackingFunct = (value) => {
  if (guessTracking.guessOne === '') {
    setGuessTracking((prevState) => ({
      ...prevState,
      guessOne: value,
      guessTwo: '',
      guessThree: '',
      guessFour: '',
      guessFive: ''
    }));
  } else if (guessTracking.guessTwo === '') {
    setGuessTracking((prevState) => ({
      ...prevState,
      guessTwo: value,
      guessThree: '',
      guessFour: '',
      guessFive: ''
    }));
  } else if (guessTracking.guessThree === '') {
    setGuessTracking((prevState) => ({
      ...prevState,
      guessThree: value,
      guessFour: '',
      guessFive: ''
    }));
  } else if (guessTracking.guessFour === '') {
    setGuessTracking((prevState) => ({
      ...prevState,
      guessFour: value,
      guessFive: ''
    }));
  } else if (guessTracking.guessFive === '') {
    setGuessTracking((prevState) => ({
      ...prevState,
      guessFive: value
    }));
  }
  else{
    alert('out of guesses')
  }
};

useEffect(() => {
  console.log('guessOne:', guessTracking.guessOne);
  console.log('guessTwo:', guessTracking.guessTwo);
  console.log('guessThree:', guessTracking.guessThree);
  console.log('guessFour:', guessTracking.guessFour);
  console.log('guessFive:', guessTracking.guessFive);
}, [guessTracking]);
////////////////////////////////////////////////




  // this is handling the user pressing enter
  const handleEnter = (value) => {
    setUserPressedEnter(value);
    // console.log(value);
    // console.log(userPressedEnter);
    // console.log("pressing enter");
    // console.log("this is movie title: " + search[0].movieTitle);

    let movieTitle = search[0].movieTitle.toLowerCase();

    if (value.toLowerCase() === movieTitle) {
      console.log("THIS WORK");
      setFetchedMovieTitle([]); // Clear the search results
      setGameGuessCounter(gameGuessCounter + 1)
      console.log(gameGuessCounter)


      guessTrackingFunct(value)


    } else {
      console.log("wrong answer");
      setFetchedMovieTitle([]); // Clear the search results
      setGameGuessCounter(gameGuessCounter + 1)
      console.log(gameGuessCounter)

      guessTrackingFunct(value)
    }
  };

  // this is handling the user clicking the movie from the list
  const handleSearchResultClick = (title) => {
    let movieTitle = search[0].movieTitle.toLowerCase();
    setMovieTitleSearch(title);
    setFetchedMovieTitle([]); // Clear the search results
    setHandleClickBool(true); // this is literally just to stop showing results when you pick a movie

    if (title.toLowerCase() === movieTitle) {
      console.log("THIS WORK");
      setFetchedMovieTitle([]); // Clear the search results
      setGameGuessCounter(gameGuessCounter + 1)
      console.log(gameGuessCounter)
    } else {
      console.log("wrong answer");
      setFetchedMovieTitle([]); // Clear the search results
      setGameGuessCounter(gameGuessCounter + 1)
      console.log(gameGuessCounter)
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Movie Guessing Game
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading images...</p>
        ) : movieImages &&
          movieImages.backdrops &&
          movieImages.backdrops.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative pb-[56.25%]">
              {" "}
              {/* 16:9 aspect ratio */}
              <img
                src={`${BASE_IMAGE_URL}${movieImages.backdrops[currentImageIndex].file_path}`}
                alt={`Backdrop ${currentImageIndex + 1}`}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <button
                  onClick={prevImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  onClick={nextImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
              <p className="text-center text-gray-600">
                Image {currentImageIndex + 1} of {movieImages.backdrops.length}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No images available.</p>
        )}

        <div className="mt-8">
          <GuessTracking />
        </div>

        <div className="mt-8">
  <input
    type="text"
    value={movieTitleSearch}
    onClick={() => setHandleClickBool(false)}
    onChange={(e) => setMovieTitleSearch(e.target.value.toLowerCase())}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleEnter(e.target.value);
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Guess the movie title..."
  />
  
  {/* Search results dropdown */}
  <div className="mt-4 relative">
    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
      {fetchedMovieTitle.map((movie) => (
        <div key={movie.id}>
          {!handleClickBool && movieTitleSearch.length > 0 && (
            <div 
              onClick={() => handleSearchResultClick(movie.title)}
              className="cursor-pointer hover:bg-gray-100 p-2 text-sm"
            >
              {movie.title}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

        <div className="mt-8 text-center">
          <button
            onClick={generateNewRandomId}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full"
          >
            New Random Movie
          </button>

      
        </div>
      </div>
    </div>
  );
}

export default App;
