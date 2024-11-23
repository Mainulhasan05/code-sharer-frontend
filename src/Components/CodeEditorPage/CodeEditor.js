"use client";
import Editor from "@monaco-editor/react";
import React, { useState, useEffect, useRef } from "react";
import { getSocket } from "@/utils/socket";

const CodeEditor = ({ data }) => {
  const [code, setCode] = useState(data?.code || ""); // Local state for the editor
  const editorRef = useRef(null); // Reference to the editor instance
  const socket = getSocket(); // Get socket instance
  const isServerUpdate = useRef(false); // Flag to track if the change is from the server

  useEffect(() => {
    if (!socket || !data?.id) return;

    // Join the session room for real-time updates
    socket.emit("joinSession", { sessionId: data.id });

    // Listen for session updates from the server
    socket.on("sessionUpdate", (update) => {
      if (update.sessionId === data.id && editorRef.current) {
        const editor = editorRef.current;
        const currentPosition = editor.getPosition(); // Capture current cursor position

        isServerUpdate.current = true; // Set the flag
        editor.setValue(update.code); // Update the editor content

        if (currentPosition) {
          editor.setPosition(currentPosition); // Restore the cursor position
        }
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.emit("leaveSession", { sessionId: data.id });
      socket.off("sessionUpdate");
    };
  }, [socket, data?.id]);

  const handleEditorChange = (value) => {
    if (isServerUpdate.current) {
      isServerUpdate.current = false; // Reset the flag
      return; // Skip further processing
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

  return (
    <div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
        }}
        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
      >
        Copy
      </button>

      {/* Code Editor */}
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        value={code} // Controlled component
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          automaticLayout: true,
        }}
        onMount={(editor) => (editorRef.current = editor)} // Capture editor instance
      />
    </div>
  );
};

export default CodeEditor;
