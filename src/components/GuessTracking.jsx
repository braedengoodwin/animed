import React from 'react';
import { RiCheckboxBlankFill } from "react-icons/ri";

const GuessTracking = ({ guesses, maxGuesses, gameState, movieTitle }) => {
  const getIconStyle = (index) => {
    if (index >= guesses.length) {
      return { fill: 'black', stroke: 'none' }; // Unused guess
    }
    return guesses[index].correct
      ? { fill: "green", stroke: "none" }
      : { fill: "red", stroke: "none" };
  };

  return (
    <div className="flex flex-col items-center"> {/* Center content vertically */}
      <div className="flex justify-center space-x-2 mb-4"> {/* Center boxes horizontally and add bottom margin */}
        {[...Array(maxGuesses)].map((_, index) => (
          <RiCheckboxBlankFill
            key={index}
            className="text-3xl"
            style={getIconStyle(index)}
          />
        ))}
      </div>
      {gameState === 'won' && <p className="mt-2 text-green-600">Congratulations! You won! The answer was: {movieTitle}</p>}
      {gameState === 'lost' && <p className="mt-2 text-red-600">Game over. The correct answer was: {movieTitle}</p>}
    </div>
  );
};

export default GuessTracking;