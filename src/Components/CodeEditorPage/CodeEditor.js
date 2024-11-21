"use client";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import React from "react";

const CodeEditor = () => {
  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </div>
  );
};

export default CodeEditor;
