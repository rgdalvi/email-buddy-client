"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmails } from "./actions";
import SignInButton from "./components/SignInButton";
import { useSession } from "next-auth/react";
import axios from "axios";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { FaBoltLightning } from "react-icons/fa6";
import { MdPrivacyTip } from "react-icons/md";
import { BiBot } from "react-icons/bi";

export default function Home() {
  const router = useRouter();
  const [emails, setEmails] = useState(null);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const storeEmailsToVectorDB = async () => {
    if (session) {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/emails", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        console.log("Emails:", response.data);
        router.push("/chat");
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (session) {
      storeEmailsToVectorDB();
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700">
      <BiBot size={40} color="#4a044e" className="text-center" />
      <h1 className="text-5xl font-bold mb-4 text-center text-white bg-clip-text text-transparent rounded bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-800 via-sky-600 to-violet-800">
        SmartMailBot
      </h1>
      <p className="text-xl font-semibold mb-8 text-center text-white">
        Unleash the{" "}
        <span className="bg-clip-text text-transparent rounded text-fuchsia-950">
          Power of AI{"  "}
        </span>
        in Your Inbox
      </p>
      <section className="mb-12 mt-4">
        <SignInButton />
      </section>
      {/* <div
          className="bg-slate-100 text-slate-950 font-medium text-base rounded-xl px-8 py-4 cursor-pointer hover:bg-slate-300"
          onClick={fetchEmails}
        >
          Fetch mails
        </div> */}
      <section className="flex flex-row justify-between items-center w-4/5 gap-4 text-white">
        <div className="hover:scale-105 duration-200 ease-in-out bg-gradient-to-t from-blue-700 via-blue-800 to-gray-700 bg-opacity-40 p-4 w-1/3 rounded-2xl cursor-pointer">
          <RiLightbulbFlashFill size={20} color="#fff" />
          <p className="text-lg font-bold mt-4">Smart Search</p>
          <p className="font-light">
            Just ask, and let our app pinpoint exactly what you need
          </p>
        </div>
        <div className="bg-opacity-40 p-4 w-1/3 rounded-2xl cursor-pointer hover:scale-105 duration-200 ease-in-out bg-gradient-to-t from-rose-700 to-pink-600 ">
          <FaBoltLightning size={20} color="#fff" />
          <p className="text-lg font-bold mt-4">Fast Results</p>
          <p className="font-light">
            Efficiently powered by the latest in AI and vector database
            technology
          </p>
        </div>
        <div className="bg-white bg-opacity-40 p-4 w-1/3 hover:scale-105 duration-200 ease-in-out rounded-xl cursor-pointer bg-gradient-to-t from-purple-800 via-violet-900 to-purple-800 ">
          <MdPrivacyTip size={20} color="#fff" />
          <p className="text-lg font-bold mt-4">Privacy First</p>
          <p className="font-light">
            Your data is private and secure. Only you can access your insights.
          </p>
        </div>
      </section>
      {loading && <p>Loading, fetching and saving emails to vector db...</p>}
    </div>
  );
}
