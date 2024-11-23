import CodeEditorPage from "@/Components/CodeEditorPage/CodeEditorPage";
import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { notFound } from "next/navigation";

const getData = async (slug) => {
  try {
    const response = await axiosInstance.get(`/snippets/${slug}`);
    return response.data;
  } catch (error) {
    return notFound();
  }
};

const page = async ({ params }) => {
  const data = await getData(params.slug);
  return (
    <>
      <CodeEditorPage data={data?.data} />
    </>
  );
};

export default page;
