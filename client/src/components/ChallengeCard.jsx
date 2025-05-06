import React from "react";

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="bg-green-300 p-4 rounded-xl shadow hover:shadow-xl transition">
      <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
      <p className="text-sm text-gray-800">Field: {challenge.field}</p>
      <p className="text-accent mt-2 font-bold">+{challenge.points} Points</p>
    </div>
  );
};

export default ChallengeCard;
