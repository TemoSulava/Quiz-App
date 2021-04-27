import React from "react";

const Questionnaire = ({
  handleQuestionSwitch,
  showCorrect,
  handleAnswer,
  data: { question, correct_answer, answers },
}) => {

  return (
    <div className="flex flex-col">
      <div className="bg-white text-blue-700 p-10 rounded-lg shadow-md">
        <h2 className="text-2xl">{question}</h2>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {answers.map((answer, idx) => {
          const bgColor = showCorrect
            ? answer === correct_answer
              ? "bg-green-500"
              : "bg-red-500"
            : "bg-white-500";

          const textColor = showCorrect ? "text-white-500" : "text-blue-800";
          return (
            <button
              key={idx}
              className={`bg-white ${bgColor} ${textColor} p-4 text-blue-800 font-semibold rounded shadow`}
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </button>
          );
        })}
      </div>
      {showCorrect && (
        <button
          onClick={handleQuestionSwitch}
          className={`bg-yellow-700 p-4 text-white-800 font-semibold rounded shadow mt-6`}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Questionnaire;
