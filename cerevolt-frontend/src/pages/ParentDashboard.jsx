import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

export default function ParentDashboard() {
  const navigate = useNavigate();

  // Mock data
  const [screenTime] = useState([
    { hour: "8 AM", minutes: 15 },
    { hour: "9 AM", minutes: 25 },
    { hour: "10 AM", minutes: 40 },
    { hour: "11 AM", minutes: 20 },
    { hour: "12 PM", minutes: 10 },
    { hour: "1 PM", minutes: 30 },
  ]);

  const [recentlyPlayed] = useState([
    { type: "Video", title: "Sleep Music" },
    { type: "Game", title: "Colour the Shape" },
    { type: "Video", title: "Rhymes" },
  ]);

  const [assessmentScores] = useState([
    { subject: "Math Puzzle", score: 85 },
    { subject: "Memory Game", score: 92 },
    { subject: "Shape Recognition", score: 74 },
  ]);

  const [neuroScores] = useState({
    numeric: 78,
    color: 88,
    handEye: 82,
    memory: 91,
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Parent Dashboard</h1>

      {/* Screen Time Line Chart */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Child Screen Time (Hourly)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={screenTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="minutes" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recently Played */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Recently Played</h2>
        <ul className="list-disc pl-6">
          {recentlyPlayed.map((item, i) => (
            <li key={i}>
              {item.type}: <span className="font-medium">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Assessment Scores */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Recent Assessment Scores</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Assessment</th>
              <th className="p-2 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {assessmentScores.map((a, i) => (
              <tr key={i}>
                <td className="p-2 border">{a.subject}</td>
                <td className="p-2 border">{a.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Neurocognitive Report */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Neurocognitive Levels</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-100 rounded-lg text-center">
            <p className="text-lg font-bold">{neuroScores.numeric}</p>
            <p className="text-sm">Numeric</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center">
            <p className="text-lg font-bold">{neuroScores.color}</p>
            <p className="text-sm">Color Recognition</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg text-center">
            <p className="text-lg font-bold">{neuroScores.handEye}</p>
            <p className="text-sm">Hand-Eye Coordination</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg text-center">
            <p className="text-lg font-bold">{neuroScores.memory}</p>
            <p className="text-sm">Memory</p>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <button
          onClick={() => navigate("/chatbot")}
          className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600 transition"
        >
          Access Chatbot
        </button>

        <button
          onClick={() => navigate("/monitor")}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
        >
          Monitor Child
        </button>

        <button
          onClick={() => navigate("/offlinekit")}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        >
          Access Offline Kit
        </button>

        {/* 🩺 Consult a Specialist */}
        <button
          onClick={() => navigate("/doctors")}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform duration-200 font-semibold"
        >
          🩺 Consult a Specialist
        </button>
      </div>
    </div>
  );
}
