"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import SignInButton from "../components/SignInButton";
import { BiBot } from "react-icons/bi";
import { TbUserHexagon } from "react-icons/tb";
import { FaArrowUp } from "react-icons/fa";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Function to handle sending a message
  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      const response = await fetch("http://localhost:8000/api/emails/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
          n_results: 5,
        }),
      });

      const data = await response.json();
      console.log(data);

      setMessages([
        ...messages,
        { query: input, response: data.summary || "No response" },
      ]);
      setInput("");
    }
  };

  return (
    <div className="pb-20 flex flex-col justify-center items-center min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700 text-gray-800">
      {/* SignInButton at the top right */}
      <div className="absolute top-4 right-4">
        <SignInButton />
      </div>

      {/* Query and Results Section */}

      {!messages.length ? (
        <div className="flex flex-row justify-between items-center">
          <div className="p-2 rounded-full border-solid border-2 mr-2 bg-gradient-to-b from-orange-500 to-yellow-300">
            <BiBot size={20} color="#fff" />
          </div>
          <div className="">
            Inbox looking a little busy? Let’s sort it out!
          </div>
        </div>
      ) : (
        messages?.map((msg, index) => (
          <section key={index}>
            <div className="flex-grow w-full max-w-5xl p-4 overflow-y-auto">
              <div className="mb-6">
                {/* Query */}
                <div className="w-full flex flex-row justify-between items-start">
                  <div className="bg-blue-600 bg-opacity-80 p-2 rounded-full border-solid border-2 mr-2">
                    <TbUserHexagon size={20} color="#fff" />
                  </div>
                  <div className="w-full bg-blue-600 bg-opacity-80 p-3 rounded-t-lg mb-1 text-white font-medium">
                    {msg.query}
                  </div>
                </div>
                {/* Response */}
                <div className="w-full flex flex-row justify-between items-start">
                  <div className="p-2 rounded-full border-solid border-2 mr-2 bg-gradient-to-b from-orange-500 to-yellow-300">
                    <BiBot size={20} color="#fff" />
                  </div>
                  <div className="bg-white p-4 rounded-b-lg shadow-md bg-opacity-30">
                    <ReactMarkdown className="prose max-w-none ">
                      {msg.response}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      )}

      {/* Chat Input Box */}
      <div className="fixed bottom-0 p-4 bg-opacity-30 bg-white border-t border-gray-200 w-full max-w-4xl rounded-t-2xl shadow-lg">
        <form onSubmit={sendMessage} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query here..."
            className="flex-grow p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaArrowUp />
          </button>
        </form>
      </div>
    </div>
  );
}
