import React from "react";

const ChallengeFilters = ({ category }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-gray-800">Showing challenges for: <span className="text-accent font-semibold">{category}</span></p>
      {/* Placeholder for future filter dropdowns */}
    </div>
  );
};

export default ChallengeFilters;
