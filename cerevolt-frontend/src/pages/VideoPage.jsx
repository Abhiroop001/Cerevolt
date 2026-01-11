// src/pages/VideoPage.jsx
import { useParams } from "react-router-dom";

export default function VideoPage() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Video Page</h1>
      <p className="mt-4">This is the page you want → {id}</p>
    </div>
  );
}
