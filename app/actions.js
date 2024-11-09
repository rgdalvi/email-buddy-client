"use server";

export const getEmails = async () => {
  const link = "http://127.0.0.1:8000/emails";

  try {
    const res = await fetch(link);

    if (!res?.ok) {
      console.log("failed to fetch emails");
      return null;
    }

    const data = await res?.json();
    // console.log("Fetched jobs:", data);

    return data;
  } catch (error) {
    console.log("Error fetching jobs:", error);
    return null;
  }
};



