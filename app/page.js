"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmails } from "./actions";
import SignInButton from "./components/SignInButton";
import { useSession } from "next-auth/react";
import axios from "axios";

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
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Email Buddy</h1>
      <SignInButton />
      {/* <div
          className="bg-slate-100 text-slate-950 font-medium text-base rounded-xl px-8 py-4 cursor-pointer hover:bg-slate-300"
          onClick={fetchEmails}
        >
          Fetch mails
        </div> */}
      {loading && <p>Loading, fetching and saving emails to vector db...</p>}
    </div>
  );
}
