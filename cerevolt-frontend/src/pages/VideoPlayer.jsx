import { useEffect, useState } from "react";

export default function VideoPlayer() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:2000/video/list")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch videos");
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading videos");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 24, color: "#555" }}>Loading videos...</p>;
  if (error) return <p style={{ padding: 24, color: "red" }}>{error}</p>;

  const getYouTubeID = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  };

  const cardStyle = {
    width: 360,
    border: "1px solid #ddd",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    marginBottom: 20,
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  const cardHover = {
    transform: "scale(1.03)",
  };

  const iframeStyle = {
    width: "100%",
    height: 200,
    border: "none",
  };

  const titleStyle = {
    fontSize: 18,
    fontWeight: 600,
    margin: "12px 16px 8px 16px",
    color: "#111",
  };

  const descStyle = {
    fontSize: 14,
    color: "#555",
    margin: "0 16px 12px 16px",
    lineHeight: 1.4,
  };

  return (
    <div style={{ padding: 24, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24, color: "#111" }}>Video Player</h1>

      <div style={containerStyle}>
        {videos.map((v) => {
          const videoID = getYouTubeID(v.youtubeLink);
          return (
            <div
              key={v._id}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = cardHover.transform)}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              {videoID ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoID}`}
                  title={v.title}
                  style={iframeStyle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eee",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Invalid YouTube link
                </div>
              )}

              <h2 style={titleStyle}>{v.title}</h2>
              <p style={descStyle}>{v.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
