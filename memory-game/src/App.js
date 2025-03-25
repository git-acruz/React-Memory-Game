import { useState, useEffect } from 'react';
import Form from './components/Form';
import MemoryCard from './components/MemoryCard';
import './App.css';
import AssistiveTechInfo from './components/AssistiveTechInfo';
import GameOver from './components/GameOver';
import ErrorCard from './components/ErrorCard';


function App() {
  const initialFormData = {category: "animals and nature", number: 10}

  const [isFirstRender, setisFirstRender] = useState(true)

  const [formData, setformData] = useState(initialFormData) // new variable and set variable

  const [isGameOn, setIsGameOn] = useState(false) 

  const [emojisData, setemojisData] = useState([])
  /* emojisData - new state variable,
    setemojisData - set function/variable to update emojisData */
  // console.log(emojisData)

  const [selectedCards, setselectedCards] = useState([])
  
  const [matchedCards, setmatchedCards] = useState([])

  const [areAllCardsMatched, setareAllCardsMatched] = useState(false)

  const [isError, setisError] = useState(false)
  
  
  // useEffect hook
  useEffect(() => {
    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
      setmatchedCards(prevmatchedCards => [...prevmatchedCards, ...selectedCards])
    }
  }, [selectedCards])
  /* we are now controlling that the
    code here will run whenever the value of "selectedCards" changes */
  
  useEffect(() => {
    /* trigger the condition if emojisData is not empty and all button emojis have been matched */
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setareAllCardsMatched(true)
    }
  }, [matchedCards])

    async function startGame(e) {
      e.preventDefault()

      try {

        const response = await fetch(`https://emoji-api-simple.vercel.app/emoji/category/${formData.category}`);
        // await pauses execution until the response is received.
        //("https://emojihub.yurace.pro/api/all/category/animals-and-nature") broken api amp
        // formData.category is used to make emoji category changeable.
        if (!response.ok) {
          // error handling for error 404 not found or 500 server down
          throw new Error("Failed to catch data")
        }

        const data = await response.json() // extracts JSON data from the response.
        
        const dataSlice = getDataSlice(data) // declare the returned value of the function as a const in the form of array
        
        const emojisArray = getEmojisArray(dataSlice) // declare new array
        
        setemojisData(emojisArray)
        
        setIsGameOn(true)

      } catch (error) {
        console.log(error)
        setisError(true);
      } finally {
        setisFirstRender(false) // switch it to false no matter what
      }
    }

    // generate an array of numbers as indices
    function getDataSlice(data) {
      const randomIndices = getRandomIndices(data);
      const dataSlice = randomIndices.map(index => data[index]) // map each value from randomIndices and use it to create dataSlice array from data
    
      /* using .reduce method 
      const dataSlice = randomIndices.reduce((array, index) => {
        array.push(data[index])
        
        return array;
      }, [])
      console.log(randomIndices)
      */
      return dataSlice;

    }

    // create a function to generate an array consisting of 5 random numbers as indices from "data"
    function getRandomIndices(data) {
      let randomIndicesArray = []
      // for (let i=0; i<5; i++) { -- used formData.number (see set variable above) to make number changeable --
      for (let i=0; i<(`${formData.number}` / 2); i++) {
        let randomIndex = Math.floor(Math.random() * (data.length - 1))
        // to ensure numbers does not repeat
        if (!randomIndicesArray.includes(randomIndex)) {
          randomIndicesArray.push(randomIndex)
        } else {
          i--
        }
      }

      return randomIndicesArray;
    }
    /* console.log(getRandomIndices(data)) // log to check if function is working */

    // try while loop to generate random objects in the array
    // let myArr = [];
    // while (myArr.length < 5) {
    //   let forArr = data[Math.floor(Math.random() * (data.length - 1))];
    //   myArr.push(forArr)
    // }

    // create a function to duplicate and shuffle data
    function getEmojisArray(slicedData) {
      let pairedEmojisArray = [...slicedData, ...slicedData] // ...slicedData = spread operator. this duplicates whole data twice

      // This is Fisher-Yates algorithm to shuffle the array.
      for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)) // generate random index
        const temp = pairedEmojisArray[i] // store to temp for swapping
        // swap arrays.
        pairedEmojisArray[i] = pairedEmojisArray[j]
        pairedEmojisArray[j] = temp
      }
      
      return pairedEmojisArray;
    }

    function handleFormChange(e) {
      /* e.target use for getting the element that was clicked,
        and accessing the value from input field */
      setformData(initData => ({...initData, [e.target.name]: e.target.value}))
      // the "name" we get here is the name from the select elements
      // "value" is from option
      // use this format for spread operator (state => ({...state, option})) to keep state values while updating specific properties
      // because the user can only make one selection at a time
    }

    function turnCard(name, index) {
      //console.log(matchedCards)
      // console.log({name}, {index})

      /* use .find() method to FIND the clicked emoji in the selectedCards.
        Normally it'll start as undefined if there's no card has been clicked at the start */
      /* use spread operator to merge the "name" object and "index" object into an array */

      // commenting these because it was refactored already in EmojiButton.js component

      /* const selectedCardsEntry = selectedCards.find(btnClicked => btnClicked.index === index)

      if (!selectedCardsEntry && selectedCards.length < 2) {
        setselectedCards(prevCards => [...prevCards, { name, index }]);
      } else if (!selectedCardsEntry && selectedCards.length === 2) {
        setselectedCards([{ name, index }])
      }
        */
      
      // rewriting code
      if (selectedCards.length < 2) {
        setselectedCards(prevCards => [...prevCards, { name, index }]);
      } else if (selectedCards.length === 2) {
        setselectedCards([{ name, index }])
      }
    }

    function resetGame() {
      setformData(initialFormData);
      setareAllCardsMatched(false);
      setmatchedCards([]);
      setselectedCards([]);
      setIsGameOn(false);
    }

    function resetError() {
      setisError(false)
    }
    console.log(isFirstRender)
    return (
      // rendering
      <main>
        <h1>Memory Game</h1>
        {!isGameOn && !isError && <Form handleSubmit={startGame} handleChange={handleFormChange} isFirstRender={isFirstRender}/>}
        {isGameOn && !areAllCardsMatched && <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards}/>}
        {areAllCardsMatched && <GameOver handleClick={resetGame}/>}
        {isGameOn && <MemoryCard handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}/>}
        {/* pass emojisData as the value of prop data to memorycard component.
          also pass selectedCards and matchedCards as props to memorycard component. */}
        {isError && <ErrorCard handleClick={resetError}/>}
        {/* pass the resetError function through props to the RegularButton in the ErrorCard */}
      </main>

    );
}

export default App;