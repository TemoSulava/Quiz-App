import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questionnaire from './components/Questionnaire';

const API_URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameDone, setGameDone] = useState(false);
  
//fetch the data from the API and set results to questions array
useEffect(() => {
  axios.get(API_URL)
       .then(res => res.data)
       .then(data => setQuestions(data.results))
}, []);

console.log(questions)

  //checking if answer is true or false and acting appropriately
  const handleAnswer = (answer) => {
    const newIndex = currentIndex + 1
    setCurrentIndex(newIndex)

    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1)
    }

    if(newIndex >= questions.length) {
      setGameDone(true);
    }
  }
  
  return gameDone ? (
    <h1 className="text-2xl text-white font-bold">Your score is {score}</h1>
  ) : questions.length > 0 ? (
    <div className="container">
      <Questionnaire  
      data={questions[currentIndex]} 
      handleAnswer={handleAnswer} />
    </div>
  ) : (
    <h2 className="text-2xl text-white font-bold">Loading...</h2>
  )
    
}

export default App;
