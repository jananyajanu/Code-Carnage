import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:5000");

const CommunityChat = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = prompt("Enter your name:");
    setUsername(name || "Anonymous");

    socket.on("chat message", (msg) => {
      setChatLog((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const msgData = {
      id: uuidv4(),
      user: username,
      message,
    };

    socket.emit("chat message", msgData);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold text-green-800 mb-4 text-center">
           Community Chat
        </h2>

        <div className="border h-64 overflow-y-auto p-3 mb-4 rounded bg-gray-50 text-gray-900">
          {chatLog.map((msg) => {
            const isOwn = msg.user === username;
            const alignment = isOwn ? "justify-end" : "justify-start";
            const bubbleColor = isOwn ? "bg-green-600" : "bg-gray-700";

            return (
              <div key={msg.id} className="mb-3">
                {/* Your message bubble */}
                <div className={`flex ${alignment}`}>
                  <div className={`max-w-xs p-3 rounded-lg text-white ${bubbleColor}`}>
                    <p className="text-sm">{msg.message}</p>
                    <div className="text-xs opacity-60">{msg.user}</div>
                  </div>
                </div>

                {/* If it's your message, show a reply box below to the left */}
                {isOwn && (
                  <div className="flex justify-start mt-1">
                    <div className="w-1/2 h-10 border border-green-500 rounded bg-white p-2 text-sm text-green-800 italic">
                      Reply here...
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300 text-gray-900"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunityChat;
