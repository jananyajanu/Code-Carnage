// src/Leaderboard/Board.js
import React, { useState } from "react";
import { leaderboardData } from "./database"; // static data

const Board = () => {
  const [filter, setFilter] = useState("all");

  const filteredData = leaderboardData.filter((user) => {
    if (filter === "7") return user.timeframe === "7";
    if (filter === "30") return user.timeframe === "30";
    return true;
  });

  return (
    <div className="bg-primary p-6 rounded-2xl shadow-lg text-accent">
      <div className="flex justify-center mb-4 gap-2">
        {["7", "30", "all"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === f
                ? "bg-accent text-white"
                : "bg-secondary text-white hover:bg-accent"
            }`}
            onClick={() => setFilter(f)}
          >
            {f === "7" ? "7 Days" : f === "30" ? "30 Days" : "All-Time"}
          </button>
        ))}
      </div>

      <ul className="space-y-4">
        {filteredData.map((user, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded-xl border border-accent shadow-md"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-accent">
                #{index + 1}
              </span>
              <div>
                <p className="text-base font-semibold text-accent">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <p className="text-lg font-bold text-accent">{user.points} pts</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
