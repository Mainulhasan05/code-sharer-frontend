"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import SnippetList from "@/Components/Dashboard/Snippets/SnippetList";

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  async function getSnippets() {
    const res = await axiosInstance(
      "/snippets/usersnippets?sortBy=updatedAt&order=DESC"
    );

    setSnippets(res.data.data?.snippets);
  }
  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Code Snippets</h1>
      <SnippetList snippets={snippets} getSnippets={getSnippets} />
    </div>
  );
}
