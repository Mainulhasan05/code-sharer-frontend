import CodeEditorPage from "@/Components/CodeEditorPage/CodeEditorPage";
import React from "react";
import axiosInstance from "@/utils/axiosInstance";

const page = ({ params }) => {
  console.log(params);
  return (
    <>
      <CodeEditorPage />
    </>
  );
};

export default page;
