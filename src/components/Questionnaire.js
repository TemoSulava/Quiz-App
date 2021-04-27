import React from 'react';

//Reusable button component for trivia answers
const Button = ({ answer, className }) => {
  return (
    <button className={`bg-white p-4 text-blue-700 font-semibold rounded shadow ${className}`}>
    {answer}
  </button>
  )
};

const Questionnaire = ({handleAnswer, data: {question, correct_answer, incorrect_answers} }) => {
  const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5)

  return (
    <div>
    <div className="bg-white text-blue-700 p-10 rounded-lg shadow-md">
      <h2 className="text-2xl">{question}</h2>
    </div>
    <div className="grid grid-cols-2 gap-6 mt-6">
    
        {shuffledAnswers.map(answer => (
          <Button
        className={correct_answer === answer ? 'bg-blue-400' : ''}  
        onClick={() => handleAnswer(answer)} 
        answer={answer}/>
        ))}
    </div>
  </div>
  )
  
};

export default Questionnaire;