"use client"; // Ensures client-side rendering for socket functionality
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSocket } from "@/utils/socket";
import Cookies from "js-cookie";

const CodeShareButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const socket = getSocket();
  const handleClick = () => {
    const socket = getSocket();

    if (!socket || !socket.connected) {
      alert(
        "Socket not connected. Please refresh the page or try again later."
      );
      return;
    }

    setLoading(true);

    // Emit the event to generate a session code
    socket.emit(
      "generateSessionCode",
      {
        token: Cookies.get("codesharer_token"),
      },
      (session) => {
        
        if (session) {
          router.push(`/${session?.session_code}`); 
          
          setTimeout(() => setLoading(false), 1000);
        } else {
          alert("Failed to generate session code. Please try again.");
        }
      }
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`py-3 px-6 rounded-lg text-lg font-semibold transform transition duration-300 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:scale-105"
      }`}
    >
      {loading ? "Generating..." : "Share Your Code"}
    </button>
  );
};

export default CodeShareButton;
