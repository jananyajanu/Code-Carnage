import React from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen pb-24 relative overflow-x-hidden bg-slate-900 text-white px-4 sm:px-8">
      <img
        src={logo}
        alt="Logo"
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 w-3/4 sm:w-2/3 z-0"
      />

      <div className="pt-28 text-center relative z-10">
        <h2 className="font-bold text-3xl mb-3">
          <span role="img" aria-label="seedling">🌱</span> Weekly Challenge
        </h2>
        <p className="text-lg">
          This week: <span className="text-emerald-400 font-semibold">Reduce plastic usage!</span> Share your story{" "}
          <span role="img" aria-label="earth">🌍</span>
        </p>
      </div>

      <div className="bg-slate-800 rounded-xl mt-10 p-6 relative z-10 max-w-3xl mx-auto shadow-lg">
        <h3 className="text-2xl font-semibold mb-2">About Us</h3>
        <p className="text-base leading-relaxed">
          Our platform empowers students and schools to share 60-second sustainability stories — from recycling tips to eco initiatives.
          Join the movement to make climate literacy fun and impactful!
        </p>
      </div>

      {/* Bottom Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white flex justify-around items-center py-3 shadow-inner z-20">
        <Link to="/" className="hover:text-emerald-400 font-medium">Home</Link>
        <Link to="/challenges" className="hover:text-emerald-400 font-medium">Challenges</Link>
        <Link to="/videofeed" className="hover:text-emerald-400 font-medium">VideoFeed</Link>
        <Link to="/profile" className="hover:text-emerald-400 font-medium">Profile</Link>
      </div>
    </div>
  );
}

export default HomePage;
