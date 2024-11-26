"use client";

import Link from "next/link";
import React from "react";
import axiosInstance from "@/utils/axiosInstance";

export default function SnippetList({ snippets, getSnippets }) {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!"); // Optionally, you can replace this with a toast notification.
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      try {
        const res = await axiosInstance.delete(`/snippets/${id}`);
        if (res.status === 200) {
          alert("Snippet deleted successfully.");
          getSnippets();
        }
      } catch (error) {
        console.error("Failed to delete snippet:", error);
        alert("Failed to delete snippet. Please try again.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-200 relative group"
        >
          {/* Session Code with Copy Button */}
          <div className="flex items-center justify-between mb-2">
            <Link
              href={`/${snippet.session_code}`}
              className="text-xl font-bold text-blue-400 hover:underline"
            >
              {snippet?.session_code}
            </Link>
            <button
              onClick={() =>
                handleCopy(`${window.location.origin}/${snippet.session_code}`)
              }
              className="text-gray-300 hover:text-white"
              title="Copy URL"
            >
              📋
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4">
            {snippet?.title || "No title provided."}
          </p>

          {/* Code Snippet with Copy Button */}
          <div className="relative bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code className="text-sm text-gray-200 block">
              {snippet.code
                ? snippet.code.split("\n").slice(0, 5).join("\n") + "..."
                : "// No code provided."}
            </code>
            <button
              onClick={() => handleCopy(snippet.code || "// No code provided.")}
              className="absolute top-2 right-2 text-gray-300 hover:text-white"
              title="Copy Code"
            >
              📋
            </button>
          </div>

          {/* Last Updated */}
          <p className="text-sm text-gray-400 mt-4">
            Last updated: {new Date(snippet.updatedAt).toLocaleDateString()}
          </p>

          {/* Delete Icon */}
          <button
            onClick={() => handleDelete(snippet.id)}
            className="flex flex-end top-4 right-4 text-gray-300 hover:text-red-500 transition duration-150 group-hover:scale-110"
            title="Delete Snippet"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
