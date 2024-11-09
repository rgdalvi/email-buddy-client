"use client";
import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to handle sending a message
  const sendMessage = (event) => {
    event.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        { query: input, response: "Response goes here..." },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-gray-100">
      {/* Query and Results Section */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-6">
            {/* Query */}
            <div className="bg-blue-600 p-3 rounded-md mb-2 text-blue-200">
              {msg.query}
            </div>
            {/* Response */}
            <div className="bg-gray-800 p-3 rounded-md text-gray-300">
              {msg.response}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input Box */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 w-3/4 rounded-2xl">
        <form onSubmit={sendMessage} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query here..."
            className="flex-grow p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            ^
          </button>
        </form>
      </div>
    </div>
  );
}
