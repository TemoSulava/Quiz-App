import React from 'react';


const Questionnaire = ({handleAnswer, data: {question, correct_answer, incorrect_answers} }) => {
  

  const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5)

  return (
    <div>
    <div className="bg-white text-blue-700 p-10 rounded-lg shadow-md">
      <h2 className="text-2xl">{question}</h2>
    </div>
    <div className="grid grid-cols-2 gap-6 mt-6">
        {shuffledAnswers.map((answer,idx) => (
          <button key={idx} className='bg-white p-4 text-blue-800 font-semibold rounded shadow'
          onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
    </div>
  </div>
  )
  
};

export default Questionnaire;