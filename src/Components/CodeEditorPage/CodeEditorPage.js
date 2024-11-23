import React from "react";
import CodeEditor from "./CodeEditor";

const CodeEditorPage = ({ data }) => {
  return (
    <div>
      <CodeEditor data={data} />
    </div>
  );
};

export default CodeEditorPage;
