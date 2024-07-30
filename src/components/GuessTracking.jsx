import { MdCheckBoxOutlineBlank } from "react-icons/md"
import { RiCheckboxBlankFill } from "react-icons/ri"


const rightAnswerStyle = {
    fill: 'green', // Inside color
    stroke: 'none' // Ensure no stroke
  };
  
  const wrongAnswerStyle = {
    fill: 'red', // Inside color
    stroke: 'none' // Ensure no stroke
  };
  
  const noAnswerStyle = {
    fill: 'black', // Inside color
    stroke: 'none' // Ensure no stroke
  };

const GuessTracking = () => {
    return(
        <>
        <RiCheckboxBlankFill className='text-3xl' style={noAnswerStyle}/>
        </>
     )
}

export default GuessTracking