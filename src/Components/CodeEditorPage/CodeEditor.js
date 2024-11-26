"use client";

import Editor from "@monaco-editor/react";
import React, { useState, useEffect, useRef } from "react";
import { getSocket } from "@/utils/socket";
import axiosInstance from "@/utils/axiosInstance";

const CodeEditor = ({ data }) => {
  const [code, setCode] = useState(data?.code || "");
  const [language, setLanguage] = useState("javascript");
  const [languages, setLanguages] = useState([]);
  const [output, setOutput] = useState("");
  const editorRef = useRef(null);
  const socket = getSocket();
  const isServerUpdate = useRef(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get(
          "https://emkc.org/api/v2/piston/runtimes"
        );
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching programming languages:", error);
      }
    };
    fetchLanguages();
  }, []);

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
      const response = await axiosInstance.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version:
            languages.find((lang) => lang.language === language)?.version || "",
          files: [{ name: "code", content: code }],
        }
      );
      setOutput(response.data.run.output || "No output");
    } catch (error) {
      setOutput(`Error executing code: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-700">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full sm:w-auto mb-2 sm:mb-0 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {languages.map((lang) => (
            <option
              className="text-black"
              key={lang.language}
              value={lang.language}
            >
              {lang.language} ({lang.version})
            </option>
          ))}
        </select>

        <div className="flex space-x-2">
          <button
            onClick={handleRunCode}
            className="w-full sm:w-auto text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Run
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
            className="w-full sm:w-auto text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Copy Code
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-grow">
        <div className="w-full sm:w-1/2 h-1/2 sm:h-full">
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

        <div className="w-full sm:w-1/2 h-1/2 sm:h-full p-4 bg-gray-900 text-white overflow-y-auto">
          <h3 className="text-lg font-bold mb-2">Output:</h3>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
