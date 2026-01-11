import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "system", content: "👋 Hi! I’m Cerevolt Chatbot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:2000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botReply =
        data?.choices?.[0]?.message?.content ||
        "⚠️ Sorry, I didn't understand that.";

      setMessages([...newMessages, { role: "assistant", content: botReply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Error: " + error.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-screen text-white bg-gradient-to-br from-[#0a0f1f] via-[#101a2b] to-[#1b263b]">
      {/* 🔹 Header */}
      <div className="p-4 bg-[#0d1422]/80 backdrop-blur-md border-b border-blue-800 text-center text-2xl font-bold tracking-wide shadow-md">
        Cerevolt Chatbot
      </div>

      {/* 🔹 Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-5 py-3 rounded-2xl max-w-xl shadow-lg transition-all duration-300 backdrop-blur-lg
              ${
                msg.role === "user"
                  ? "bg-blue-600/70 text-white self-end ml-auto border border-blue-400/50"
                  : "bg-gray-800/60 text-cyan-200 self-start mr-auto border border-cyan-400/30"
              }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-gray-400 italic animate-pulse">
            Cerevolt is typing...
          </div>
        )}
      </div>

      {/* 🔹 Input */}
      <div className="p-4 border-t border-blue-800 bg-[#0d1422]/80 backdrop-blur-lg flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-blue-900 bg-[#0a0f1f]/80 text-white rounded-lg p-3 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
