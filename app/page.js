"use client";

import React, { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import { getEmails } from "./actions";
export default function Home() {

  const router = useRouter();
  const [emails, setEmails] = useState(null);

  const fetchEmails = async () => {
    const emailData = await getEmails();
    setEmails(emailData);
    console.log(emails, emailData);
    
  };

  // useEffect(() => {
  //   const fetchEmails = async () => {
  //     const emailData = await getEmails();
  //     setEmails(emailData);
  //     console.log(emails, emailData);
      
  //   };

  //   fetchEmails();
  // }, []);

  const Login = () =>{
    fetchEmails();
    // router.push("/chat");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Email Buddy</h1>
      <div className="bg-slate-100 text-slate-950 font-medium text-base rounded-xl px-8 py-4 cursor-pointer hover:bg-slate-300" onClick={Login}>
        Login with Google
      </div>
    </div>
  );
}
