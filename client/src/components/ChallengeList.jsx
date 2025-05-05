import React from "react";
import ChallengeCard from "./ChallengeCard";

const sampleChallenges = [
  { title: "Plant a Tree", points: 20, field: "Environmental Sustainability" },
  { title: "Solar Panel Quiz", points: 10, field: "Renewable Energy" },
  { title: "Recycling Tips Reel", points: 20, field: "Recycling" },
];

const ChallengeList = ({ category }) => {
  const filtered = category === "All" ? sampleChallenges : sampleChallenges.filter(ch => ch.field === category);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((challenge, index) => (
        <ChallengeCard key={index} challenge={challenge} />
      ))}
    </div>
  );
};

export default ChallengeList;
