import React, { useState } from "react";
import CategoryTabs from "../components/CategoryTabs";
import ChallengeFilters from "../components/ChallengeFilters";
import ChallengeList from "../components/ChallengeList";
import ChallengeQuiz from "../components/ChallengeQuiz";
import ReelUpload from "../components/ReelUpload";

const WeeklyChallenges = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="bg-green-100 min-h-screen py-10 px-4 sm:px-8 lg:px-20 text-accent">
      <div className="max-w-5xl mx-auto bg-primary p-6 sm:p-10 rounded-3xl shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">🌱 Weekly Challenges</h1>

        <CategoryTabs selected={selectedCategory} setSelected={setSelectedCategory} />
        <div className="my-6">
          <ChallengeFilters category={selectedCategory} />
        </div>

        <ChallengeList category={selectedCategory} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white border border-accent p-4 rounded-xl shadow-md">
            <ChallengeQuiz category={selectedCategory} />
          </div>
          <div className="bg-white border border-accent p-4 rounded-xl shadow-md">
            <ReelUpload category={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChallenges;
