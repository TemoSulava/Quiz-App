import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questionnaire from './components/Questionnaire';

const API_URL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  
//fetch the data from the API and set results to questions array
useEffect(() => {
  axios.get(API_URL)
       .then(res => res.data)
       .then(data => {
         const questions = data.results.map(question => 
          ({
             ...question,
             answers: [
               question.correct_answer,
               ...question.incorrect_answers,
             ].sort(() => Math.random() - 0.5)
           }))
           setQuestions(questions)
       });
}, []);

  //checking if answer is true or false and acting appropriately
  const handleAnswer = (answer) => {

    if(!showCorrect) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    
    }
    setShowCorrect(true)
  }

  const handleRestart =  () => {
    setCurrentIndex(0);
  }

  //Using next button to change question
  const handleQuestionSwitch = () => {
    setShowCorrect(false);
    setCurrentIndex(currentIndex + 1)
  }
  
  /* If data is not yet fetched on first render, we display loading screen
    When the data is loaded we render our react application
    After we are out of questions, we display total points earned and the button to restart the Quiz. */
    
  return questions.length > 0 ? (
    <div className="container">
      {currentIndex >= questions.length ? (
        <div className="text-2xl text-white font-bold">
          Game Over! Your score is {score}.
          <h2>
            <button
              className="bg-yellow-700 p-4 text-white-800 font-semibold rounded shadow mt-10 ml-14"
              onClick={handleRestart}
            >
              New Quiz
            </button>
          </h2>
        </div>
      ) : (
        <Questionnaire
          handleQuestionSwitch={handleQuestionSwitch}
          showCorrect={showCorrect}
          data={questions[currentIndex]}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  ) : (
    <h2 className="text-2xl text-white font-bold">Loading...</h2>
  );
    
}

export default App;
