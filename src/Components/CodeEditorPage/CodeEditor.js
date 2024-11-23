"use client";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import React from "react";

const CodeEditor = ({ data }) => {
  return (
    <div>
      {/* copy button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(data?.code);
        }}
      >
        Copy
      </button>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        line={20}
        defaultValue={data?.code || ""}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;
