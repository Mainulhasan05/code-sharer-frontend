import CodeEditorPage from "@/Components/CodeEditorPage/CodeEditorPage";
import React from "react";
import axiosInstance from "@/utils/axiosInstance";
import { notFound } from "next/navigation";
import { analytics } from "@/utils/gtag";

export const generateMetadata =async ({ params }) => {
  
  const {data} = await getData(params.slug);
  
  
  return {
    title: `${data.session_code} - Codesharer`,
    description: data.description,
    keywords: "code sharing, coding platform, programming, open source, developer community, collaborate on code, learn to code",
    openGraph: {
      title: data.session_code,
      description: data.description,
      url: `${process.env.SITE_URL}/${data.slug}`,
      siteName: "Codesharer",
      images: [
        {
          url: `${process.env.SITE_URL}assets/logo.png`,
          width: 1200,
          height: 630,
          alt: data.session_code,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.session_code,
      description: data.description,
      image: `${process.env.SITE_URL}assets/logo.png`,
    },
    // add canonical URL
    alternates: {
      canonical: `${process.env.SITE_URL}${data.session_code}`,
      languages: {
        "en-US": `/${data.slug}`,
      },
    },
  };
}


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
  analytics.page();
  analytics.track("page_view", {
    page_path: `/${params.slug}`,
    page_title: data?.data?.session_code,
  });
  return (
    <>
      <CodeEditorPage data={data?.data} />
    </>
  );
};

export default page;
