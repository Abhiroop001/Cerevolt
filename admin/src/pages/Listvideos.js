import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";

export default function ListVideos() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await fetch("http://localhost:2000/video/list");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      const res = await fetch("http://localhost:2000/video/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      alert(data.msg);
      fetchVideos();
    } catch (err) {
      console.error("Failed to delete video:", err);
      alert("Failed to delete video");
    }
  };

  return (
    <div id="wrapper" className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div id="content-wrapper" className="flex flex-col flex-grow">
        <Top />

        <div id="content" className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Videos</h1>

          {videos.length === 0 ? (
            <p className="text-gray-600">Loading videos...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <div
                  key={v._id}
                  className="bg-white shadow-md rounded-xl p-5 transition-transform transform hover:scale-[1.02]"
                >
                  <h2 className="font-semibold text-xl text-gray-800 mb-2">{v.title}</h2>
                  <ReactPlayer
                    url={v.youtubeLink}
                    controls
                    width="100%"
                    height="240px"
                  />
                  <p className="text-gray-600 text-sm mb-4">{v.description}</p>
                  <div className="flex gap-2">
                    <a
                      href={v.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                    >
                      ▶️ Watch on YouTube
                    </a>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
