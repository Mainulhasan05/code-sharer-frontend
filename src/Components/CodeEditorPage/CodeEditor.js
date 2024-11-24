"use client";
import Editor from "@monaco-editor/react";
import React, { useState, useEffect, useRef } from "react";
import { getSocket } from "@/utils/socket";
import axiosInstance from "@/utils/axiosInstance";

const CodeEditor = ({ data }) => {
  const [code, setCode] = useState(data?.code || ""); // Local state for the editor
  const [language, setLanguage] = useState("javascript"); // State for selected language
  const [languages, setLanguages] = useState([]); // Fetched languages
  const [output, setOutput] = useState(""); // Code execution output
  const editorRef = useRef(null); // Reference to the editor instance
  const socket = getSocket(); // Get socket instance
  const isServerUpdate = useRef(false); // Flag to track if the change is from the server

  // Fetch programming languages on mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("https://emkc.org/api/v2/piston/runtimes");
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching programming languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  // Socket functionality (existing code remains unchanged)
  useEffect(() => {
    if (!socket || !data?.id) return;

    socket.emit("joinSession", { sessionId: data.id });

    socket.on("sessionUpdate", (update) => {
      if (update.sessionId === data.id && editorRef.current) {
        const editor = editorRef.current;
        const currentPosition = editor.getPosition();

        isServerUpdate.current = true;
        editor.setValue(update.code);

        if (currentPosition) {
          editor.setPosition(currentPosition);
        }
      }
    });

    return () => {
      socket.emit("leaveSession", { sessionId: data.id });
      socket.off("sessionUpdate");
    };
  }, [socket, data?.id]);

  const handleEditorChange = (value) => {
    if (isServerUpdate.current) {
      isServerUpdate.current = false;
      return;
    }

    setCode(value);
    if (socket && data?.id) {
      socket.emit(
        "updateSession",
        { sessionId: data.id, code: value },
        (ack) => {
          if (!ack?.success) {
            console.error("Failed to update session on server");
          }
        }
      );
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleRunCode = async () => {
    try {
      const response = await axiosInstance.post("https://emkc.org/api/v2/piston/execute", {
        language,
        version: languages.find((lang) => lang.language === language)?.version || "",
        files: [{ name: "code", content: code }],
      });
      setOutput(response.data.run.output || "No output");
    } catch (error) {
      setOutput(`Error executing code: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-gray-100">
        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="border p-2 rounded"
        >
          {languages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.language} ({lang.version})
            </option>
          ))}
        </select>

        <button
          onClick={handleRunCode}
          className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Run
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
          }}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Copy Code
        </button>

        
      </div>

      <div className="flex flex-grow">
        {/* Code Editor */}
        <div className="w-1/2">
          <Editor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              automaticLayout: true,
            }}
            onMount={(editor) => (editorRef.current = editor)}
          />
        </div>

        {/* Output section */}
        <div className="w-1/2 p-4 bg-gray-900 text-white overflow-y-auto">
          <h3 className="text-lg font-bold mb-2">Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
