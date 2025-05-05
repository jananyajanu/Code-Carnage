import React from "react";

const PointsInfo = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-accent">
      <h3 className="text-2xl font-semibold mb-4 text-center">📊 How Points Are Awarded</h3>
      <ul className="list-disc list-inside text-lg space-y-2">
        <li>🎥 Uploading a reel: <span className="font-semibold">+25 points</span></li>
        <li>🗓️ Daily login: <span className="font-semibold">+5 points</span></li>
        <li>🏆 Weekly challenge participation: <span className="font-semibold">+50 points</span></li>
        <li className="mt-4 text-sm text-gray-600 italic">
          Points are calculated weekly and top scorers are shown on the leaderboard.
        </li>
      </ul>
    </div>
  );
};

export default PointsInfo;
