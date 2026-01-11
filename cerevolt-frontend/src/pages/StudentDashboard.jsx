// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// List of 25 popular kid-friendly games
const games = [
  "Colour the Shape", "Chase the Roach", "Hammer the Hedgehog", "Puzzle Mania",
  "Memory Match", "Math Wizard", "Animal Quiz", "Shape Explorer", "Letter Hunt",
  "Rhymes Adventure", "Fruit Collector", "Ball Bounce", "Dragon Fly", "Ocean Escape",
  "Treasure Hunt", "Build & Play", "Word Wizard", "Number Ninja", "Space Explorer",
  "Candy Catch", "Zoo Builder", "Magic Maze", "Bug Catcher", "Color Splash"
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-indigo-500 text-white p-4 flex justify-between items-center shadow">
        <div className="text-xl font-bold">Cerevolt Child Dashboard</div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Today's Goals */}
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Today's Goals</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Complete memory game</li>
            <li>Watch 1 educational video</li>
            <li>Finish coloring activity</li>
            <li>Practice handwriting for 15 mins</li>
          </ul>
        </section>

        {/* Today's Assessment Submission */}
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Today's Assessment Submission</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Math Puzzle - Submitted</li>
            <li>Shape Recognition - Pending</li>
            <li>Color Matching - Submitted</li>
            <li>Memory Game - Pending</li>
          </ul>
        </section>

        {/* Videos Button */}
        <section className="mb-6">
          <button
            className="bg-indigo-500 text-white px-6 py-3 rounded shadow hover:bg-indigo-600 transition"
            onClick={() => navigate("/videos")}
          >
            🎥 Watch Videos
          </button>
        </section>

        {/* Games Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition flex items-center justify-center text-center"
                onClick={() => navigate(`/game/${game.toLowerCase().replace(/\s+/g, "-")}`)}
              >
                🎮 {game}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
