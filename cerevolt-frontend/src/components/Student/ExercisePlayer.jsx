import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import Loading from "../Common/Loading";
import ErrorBox from "../Common/ErrorBox";

/**
 * Simple exercise player:
 * - Loads /exercises/:id
 * - Renders questions (MCQ/text)
 * - Submits to mock endpoint by saving a report in /reports
 */
export default function ExercisePlayer() {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitResult, setSubmitResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get(`/exercises/${exerciseId}`).then((r) => {
      if (mounted) {
        setExercise(r.data);
        setLoading(false);
      }
    }).catch(e => {
      setError("Failed to load exercise");
      setLoading(false);
    });
    return () => (mounted = false);
  }, [exerciseId]);

  if (loading) return <Loading />;
  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!exercise) return <div>No exercise found</div>;

  const handleChange = (qid, val) => setAnswers((s) => ({ ...s, [qid]: val }));

  const handleSubmit = async () => {
    let score = 0;
    let total = 0;
    exercise.questions.forEach((q) => {
      total++;
      if (q.type === "mcq" && answers[q.id] && answers[q.id] === q.answer) score++;
    });
    const percent = Math.round((score / total) * 100);
    const payload = {
      studentId: localStorage.getItem("cv_token") || "unknown",
      exerciseId: exercise.id,
      score: percent,
      date: new Date().toISOString().slice(0, 10),
      feedback: percent >= 70 ? "Nice work" : "Keep practicing"
    };

    const res = await api.post("/reports", payload);
    setSubmitResult({ percent, saved: res.data });
  };

  if (submitResult) {
    return (
      <div className="p-4">
        <h2 className="text-xl">You scored {submitResult.percent}%</h2>
        <p className="text-slate-600">Report recorded.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-3">{exercise.title}</h1>

      <div className="space-y-4">
        {exercise.questions.map((q, idx) => (
          <div key={q.id} className="p-3 border rounded">
            <div className="font-medium mb-2">Q{idx + 1}. {q.text}</div>
            {q.type === "mcq" ? (
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label key={opt} className="flex items-center space-x-2">
                    <input type="radio" name={q.id} onChange={() => handleChange(q.id, opt)} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea className="w-full border rounded p-2" onChange={(e) => handleChange(q.id, e.target.value)} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={handleSubmit} className="px-4 py-2 rounded bg-cerevoltBlue text-white">Submit</button>
      </div>
    </div>
  );
}
