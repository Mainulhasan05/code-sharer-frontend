import CodeEditorPage from "@/Components/CodeEditorPage/CodeEditorPage";
import React from "react";
import axiosInstance from "@/utils/axiosInstance";

const getData = async (slug) => {
  try {
    const response = await axiosInstance.get(`/snippets/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error?.response?.data);
    return null;
  }
};

const page = async ({ params }) => {
  const data = await getData(params.slug);
  console.log(data);
  return (
    <>
      <CodeEditorPage />
    </>
  );
};

export default page;
