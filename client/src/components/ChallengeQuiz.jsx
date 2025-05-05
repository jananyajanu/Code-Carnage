import React from "react";

const ChallengeQuiz = ({ category }) => {
  return (
    <div className="bg-green-300 p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">{category} Quiz</h3>
      <p className="text-gray-800 text-sm mb-4">Quiz questions will appear here.</p>
      <button className="bg-secondary hover:bg-primary px-4 py-2 rounded">Start Quiz</button>
    </div>
  );
};

export default ChallengeQuiz;
